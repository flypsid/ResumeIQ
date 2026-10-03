export interface PdfConversionResult {
  file: File | null;
  error?: string;
}

let pdfjsLib: any = null;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
  if (pdfjsLib) return pdfjsLib;
  if (loadPromise) return loadPromise;

  // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
  loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
    // Set the worker source to use local file
    lib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    pdfjsLib = lib;
    return lib;
  });

  return loadPromise;
}

export async function convertPdfToImage(
  file: File
): Promise<PdfConversionResult> {
  try {
    const lib = await loadPdfJs();

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await lib.getDocument({ data: arrayBuffer }).promise;

    if (pdf.numPages === 0) {
      throw new Error("PDF document has no pages");
    }

    const page = await pdf.getPage(1);

    // Scale 2 is enough for an on-screen preview and keeps the stored image
    // (and the Puter quota usage) small.
    const viewport = page.getViewport({ scale: 2 });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Failed to get canvas 2D context");
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    await page.render({ canvasContext: context, viewport }).promise;

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve({ file: null, error: "Failed to create image blob" });
            return;
          }

          // Create a File from the blob with the same name as the pdf
          const originalName = file.name.replace(/\.pdf$/i, "");
          const imageFile = new File([blob], `${originalName}.png`, {
            type: "image/png",
          });

          resolve({ file: imageFile });
        },
        "image/png",
        1.0
      );
    });
  } catch (err) {
    console.error("PDF conversion error:", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return {
      file: null,
      error: `Failed to convert PDF: ${errorMessage}`,
    };
  }
}
