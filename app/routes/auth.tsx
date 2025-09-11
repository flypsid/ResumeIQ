import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const meta = () => [
  { title: "Resumind | Auth" },
  { name: "description", content: "Log into your account" },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next]);

  return (
    <main className="bg-[url('/images/bgmain.jpg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <img
                src="/images/logo.jpg"
                alt="ResumeIQ Logo"
                className="w-40 h-15"
              />
            </button>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome to ResumeIQ
            </h1>
            <h2 className="text-lg text-gray-600">Log In to Continue.</h2>
          </div>
          <div>
            {isLoading ? (
              <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-700 hover:scale-105 transition duration-200 animate-pulse">
                <p>Signing you in...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button
                    className="w-full bg-red-900 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 hover:scale-105 transition duration-200"
                    onClick={auth.signOut}
                  >
                    <p>Log Out</p>
                  </button>
                ) : (
                  <button
                    className="w-full bg-slate-900 text-white py-3 px-6 rounded-xl font-semibold hover:bg-slate-700 hover:scale-105 transition duration-200"
                    onClick={auth.signIn}
                  >
                    <p>Log In</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
