import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";

const links = [
  { to: "my-profile", label: "My Profile" },
  { to: "all-cart", label: "All Cart" },
  { to: "like-list", label: "Like List" },
  { to: "pending-payment", label: "Pending Payment" },
  { to: "payment-history", label: "Payment History" },
];

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-[#e0e0e0]">
      <div className="container mx-auto px-4 pb-10">
        <div className="flex flex-col lg:flex-row pt-16 lg:pt-20 gap-6 relative ">
          {/* Toggle button for mobile */}
          <button
            className="lg:hidden fixed top-4 left-4 z-50 bg-[#ffbb38] p-2 rounded-full text-black shadow-md"
            onClick={toggleSidebar}
          >
            {isOpen ? <FaTimes size={15} /> : <FaBars size={15} />}
          </button>

          {/* Sidebar */}
          <div
            className={`fixed inset-y-0 left-0 w-64 bg-white p-6 z-40 transform transition-transform duration-300 ease-in-out rounded-r-2xl  lg:relative lg:translate-x-0 lg:rounded-2xl border border-primary/60 mt-22 lg:mt-10 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <nav className="space-y-3">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `block w-full px-4 py-2 rounded-lg text-sm font-medium transition-all text-left ${
                      isActive
                        ? "bg-[#ffbb38] text-white"
                        : "hover:bg-[#ffbb38]"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <main className="flex-1  p-6 min-h-[60vh] lg:ml-0 lg:mt-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
