import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
  const { auth, isLoading, error, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);
  const [isWiping, setIsWiping] = useState(false);

  const loadFiles = useCallback(async () => {
    const items = (await fs.readDir("./")) as FSItem[] | undefined;
    setFiles(items ?? []);
  }, [fs]);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe", { replace: true });
      return;
    }

    if (auth.isAuthenticated) loadFiles();
  }, [isLoading, auth.isAuthenticated, navigate, loadFiles]);

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Delete all files and key-value entries? This cannot be undone."
      )
    ) {
      return;
    }

    setIsWiping(true);
    try {
      // forEach + async would fire un-awaited deletions; await them all.
      await Promise.all(files.map((file) => fs.delete(file.path)));
      await kv.flush();
      await loadFiles();
    } finally {
      setIsWiping(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <div>
      Authenticated as: {auth.user?.username}
      <div>Existing files:</div>
      <div className="flex flex-col gap-4">
        {files.map((file) => (
          <div key={file.id} className="flex flex-row gap-4">
            <p>{file.name}</p>
          </div>
        ))}
      </div>
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer disabled:opacity-50"
          onClick={handleDelete}
          disabled={isWiping}
        >
          {isWiping ? "Wiping..." : "Wipe App Data"}
        </button>
      </div>
    </div>
  );
};

export default WipeApp;
