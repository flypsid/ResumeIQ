import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between items-center bg-white rounded-full p-4 w-full px-10 max-w-[1100px] mx-auto">
      <Link to="/">
        <img
          src="/images/logo.jpg"
          alt="ResumeIQ Logo"
          className="h-10 w-auto"
        />
      </Link>
      <Link
        to="/upload"
        className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-full transition-colors"
      >
        Upload Resume
      </Link>
    </nav>
  );
};

export default Navbar;
