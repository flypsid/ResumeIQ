import { type FormEvent, useState } from "react";
import Navbar from "../components/navbar";
import FileUploader from "../components/FileUploader";
import { usePuterStore } from "../lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "../lib/pdf2img";
import { generateUUID, getErrorMessage } from "../lib/utils";
import { feedbackSchema } from "../lib/schemas";
import { MAX_FILE_SIZE, prepareInstructions } from "../../constants";

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    // Validate before flipping the UI into the processing state, otherwise a
    // validation error would leave the screen stuck on the loader.
    if (!file || file.size === 0) {
      return setStatusText("Error: Invalid or empty file");
    }

    if (file.size > MAX_FILE_SIZE) {
      return setStatusText("Error: File size exceeds 20MB limit");
    }

    setIsProcessing(true);
    setStatusText("Uploading the file...");
    try {
      const uploadedFile = await fs.upload([file]);
      if (!uploadedFile) throw new Error("Failed to upload file");

      setStatusText("Converting to image...");
      const imageFile = await convertPdfToImage(file);
      if (!imageFile.file) {
        console.error("PDF conversion failed:", imageFile.error);
        throw new Error(imageFile.error || "Failed to convert PDF to image");
      }

      setStatusText("Uploading the image...");
      const uploadedImage = await fs.upload([imageFile.file]);
      if (!uploadedImage) throw new Error("Failed to upload image");

      setStatusText("Preparing data...");
      const uuid = generateUUID();
      const data: StoredResume = {
        id: uuid,
        resumePath: uploadedFile.path,
        imagePath: uploadedImage.path,
        companyName,
        jobTitle,
        jobDescription,
        feedback: "",
      };
      await kv.set(`resume:${uuid}`, JSON.stringify(data));

      setStatusText("Analyzing...");

      const feedback = await ai.feedback(
        uploadedFile.path,
        prepareInstructions({ jobTitle, jobDescription })
      );

      if (!feedback) {
        throw new Error("Failed to analyze resume - no response from AI");
      }

      const feedbackText = Array.isArray(feedback.message.content)
        ? feedback.message.content
            .map((block) => (typeof block?.text === "string" ? block.text : ""))
            .join("")
        : feedback.message.content;

      // Robustly extract the JSON object, even when the model wraps it in
      // markdown fences or adds text before/after it.
      const jsonMatch = feedbackText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("The AI response did not contain a JSON object.");
      }

      // Runtime validation: the results page reads feedback.ATS.score,
      // feedback.toneAndStyle.tips, ... directly, so a malformed payload
      // would crash the UI.
      const parsedFeedback: Feedback = feedbackSchema.parse(
        JSON.parse(jsonMatch[0])
      );

      data.feedback = parsedFeedback;
      await kv.set(`resume:${uuid}`, JSON.stringify(data));
      setStatusText("Analysis complete, redirecting...");
      navigate(`/resume/${uuid}`);
    } catch (error) {
      console.error("AI Analysis error:", error);
      setStatusText(`Error: ${getErrorMessage(error)}`);
    } finally {
      // Always release the loader, whatever failed.
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check authentication before processing
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/upload");
      return;
    }

    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) return;

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="bg-[url('/images/bgmain.jpg')] bg-cover">
      <Navbar />

      <section className="main-section px-4 sm:px-6 lg:px-8">
        <div className="page-heading py-8 sm:py-12 lg:py-16 max-w-6xl mx-auto">
          <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Smart Resume Analysis
          </h1>
          {isProcessing ? (
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-center text-lg sm:text-xl text-gray-600 animate-pulse px-4">
                {statusText}
              </h2>
              <div className="w-full max-w-md">
                <img
                  src="/images/resume-scan.gif"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-center text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto px-4">
                Get comprehensive feedback on your resume's effectiveness
                against job requirements and ATS systems
              </h2>
              <form
                id="upload-form"
                onSubmit={handleSubmit}
                className="max-w-4xl mx-auto space-y-6 sm:space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="company-name"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company-name"
                      placeholder="e.g., Google, Microsoft"
                      id="company-name"
                      className="w-full px-4 py-3 sm:px-6 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="job-title"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="job-title"
                      placeholder="e.g., Software Engineer"
                      id="job-title"
                      className="w-full px-4 py-3 sm:px-6 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-base"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="job-description"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Job Description
                  </label>
                  <textarea
                    rows={6}
                    name="job-description"
                    placeholder="Paste the job description here..."
                    id="job-description"
                    className="w-full px-4 py-3 sm:px-6 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-vertical text-base"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="uploader"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Upload Resume
                  </label>
                  <FileUploader onFileSelect={handleFileSelect} />
                </div>

                <div className="pt-4">
                  <button
                    className="w-full bg-slate-900 text-white py-4 px-6 rounded-xl font-semibold hover:bg-slate-700 hover:scale-105 transition duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg"
                    type="submit"
                    disabled={!file}
                  >
                    {file ? "Analyze Resume" : "Please select a file first"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
};
export default Upload;
