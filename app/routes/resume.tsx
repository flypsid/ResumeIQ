import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import { getErrorMessage } from "~/lib/utils";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => [
  { title: "ResumeIQ | Resume Review" },
  { name: "description", content: "Detailed overview of your resume" },
];

type LoadStatus = "loading" | "ready" | "error";

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [loadError, setLoadError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`, { replace: true });
    }
  }, [isLoading, auth.isAuthenticated, id, navigate]);

  useEffect(() => {
    let cancelled = false;
    let createdResumeUrl = "";
    let createdImageUrl = "";

    const loadResume = async () => {
      try {
        const resume = await kv.get(`resume:${id}`);
        if (!resume) throw new Error("This analysis could not be found.");

        const data = JSON.parse(resume) as StoredResume;

        if (!data.feedback || typeof data.feedback !== "object") {
          throw new Error(
            "This resume is still being analyzed or the analysis failed."
          );
        }

        const resumeBlob = await fs.read(data.resumePath);
        if (resumeBlob) {
          createdResumeUrl = URL.createObjectURL(
            new Blob([resumeBlob], { type: "application/pdf" })
          );
          setResumeUrl(createdResumeUrl);
        }

        const imageBlob = await fs.read(data.imagePath);
        if (imageBlob) {
          createdImageUrl = URL.createObjectURL(imageBlob);
          setImageUrl(createdImageUrl);
        }

        if (cancelled) return;
        setFeedback(data.feedback);
        setStatus("ready");
      } catch (error) {
        if (cancelled) return;
        setLoadError(getErrorMessage(error));
        setStatus("error");
      }
    };

    loadResume();

    return () => {
      cancelled = true;
      // Release the object URLs created for this effect run.
      if (createdResumeUrl) URL.revokeObjectURL(createdResumeUrl);
      if (createdImageUrl) URL.revokeObjectURL(createdImageUrl);
    };
  }, [id, fs, kv]);

  return (
    <main className="!pt-0">
      <nav className="bg-white shadow-lg p-4 sm:p-6 border-b">
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-3 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <img
            src="/icons/back.svg"
            alt="back"
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
          <span className="text-sm sm:text-base font-semibold">
            Back to Homepage
          </span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse gap-4 sm:gap-8 p-2 sm:p-4 min-h-screen">
        <section className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-[50vh] sm:min-h-screen">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[80%] sm:h-[90%] max-wxl:h-fit w-fit shadow-xl">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  alt="Preview of your uploaded resume"
                  className="w-full h-full object-contain rounded-2xl"
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>
        <section className="flex-1 p-4 sm:p-8">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            Resume Analysis Results
          </h2>
          {status === "error" ? (
            <div className="flex flex-col items-center gap-5 p-4 text-center">
              <img src="/icons/warning.svg" alt="" className="size-10" />
              <p className="text-sm sm:text-base text-gray-700">{loadError}</p>
              <Link
                to="/upload"
                className="bg-slate-900 text-white py-3 px-6 rounded-xl font-semibold hover:bg-slate-700 transition duration-200"
              >
                Analyze another resume
              </Link>
            </div>
          ) : feedback ? (
            <div className="flex flex-col gap-6 sm:gap-8 animate-in fade-in duration-1000 bg-white rounded-lg shadow-md p-4 sm:p-6">
              <Summary feedback={feedback} />
              <ATS
                score={feedback.ATS.score || 0}
                suggestions={feedback.ATS.tips || []}
              />
              <Details feedback={feedback} />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 p-4">
              <img
                src="/images/resume-scan.gif"
                alt="Analyzing your resume"
                className="w-full max-w-xs sm:max-w-md"
              />
              <p className="text-sm sm:text-base text-gray-600 text-center px-4">
                Analyzing your resume...
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
export default Resume;
