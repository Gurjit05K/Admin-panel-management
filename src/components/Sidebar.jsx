import { FaHome, FaComments, FaCog, FaBars, FaRobot } from 'react-icons/fa';

function Sidebar({ isOpen, toggleSidebar, setShowSettings, setShowCopilot }) {
  return (
    <div
      className={`bg-teal-600 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0 transition duration-200 ease-in-out z-20 shadow-lg`}
    >
      {/* Hamburger menu for mobile */}
      <button
        className="md:hidden absolute top-4 right-4 text-white"
        onClick={toggleSidebar}
      >
        <FaBars size={24} />
      </button>
      <nav>
        <a
          href="#"
          className="block py-2.5 px-4 rounded-lg hover:bg-teal-500 transition duration-200 flex items-center text-sm font-medium"
        >
          <FaHome className="mr-2" /> Home
        </a>
        <a
          href="#"
          className="block py-2.5 px-4 rounded-lg hover:bg-teal-500 transition duration-200 flex items-center text-sm font-medium"
        >
          <FaComments className="mr-2" /> Conversations
        </a>
        <a
          href="#"
          className="block py-2.5 px-4 rounded-lg hover:bg-teal-500 transition duration-200 flex items-center text-sm font-medium"
          onClick={() => {
            setShowSettings(true);
            setShowCopilot(false);
          }}
        >
          <FaCog className="mr-2" /> Settings
        </a>
        <a
          href="#"
          className="block py-2.5 px-4 rounded-lg hover:bg-teal-500 transition duration-200 flex items-center text-sm font-medium"
          onClick={() => {
            setShowCopilot(true);
            setShowSettings(false);
          }}
        >
          <FaRobot className="mr-2" /> AI Copilot
        </a>
      </nav>
    </div>
  );
}

export default Sidebar;