import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between items-center bg-white rounded-full p-2 sm:p-4 w-full px-4 sm:px-10 max-w-[1100px] mx-auto border-2 border-gray-300 shadow-lg">
      <Link to="/">
        <img
          src="/images/logo.jpg"
          alt="ResumeIQ Logo"
          className="h-8 sm:h-10 w-auto"
        />
      </Link>
      <Link
        to="/upload"
        className="bg-gray-800 hover:bg-gray-900 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors text-sm sm:text-base"
      >
        Upload Resume
      </Link>
    </nav>
  );
};

export default Navbar;
