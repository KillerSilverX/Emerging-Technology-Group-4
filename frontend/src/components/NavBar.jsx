import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-semibold text-blue-600">
              MyFitness
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium transition duration-150"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium transition duration-150"
            >
              Dashboard
            </Link>
            <Link
              to="/fitness-games"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium transition duration-150"
            >
              Fitness Games
            </Link>
            <Link
              to="/nurse-dashboard"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium transition duration-150"
            >
              Nurse Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
