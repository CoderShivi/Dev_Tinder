import React from "react";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((store) => store.user);
 

  return (
    <div className="navbar fixed top-0 z-50 bg-base-100 shadow-md px-6">
      
      {/* Logo */}
      <div className="flex-1">
        <a className="flex items-center gap-2 text-2xl font-bold text-primary">
          🧑‍💻 <span>DevTinder</span>
        </a>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        
        {/* Notification */}
        <button className="btn btn-ghost btn-circle hover:bg-base-200">
          🔔
        </button>

        {/* User Info */}
        {user && (
          <div className="flex items-center gap-3">
            
            {/* Username */}
            <div className="hidden md:flex flex-col text-right">
              <span className="text-sm font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </span>
              <span className="text-xs text-gray-500">
                {user.emailId} 
              </span>
            </div>

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar hover:scale-105 transition"
              >
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    alt="Profile"
                    src={user.photoUrl}
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-4 w-52 rounded-xl bg-base-100 p-2 shadow-lg"
              >
                <li>
                  <a className="justify-between font-medium">
                    Profile
                    <span className="badge badge-primary">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a className="text-error font-semibold">Logout</a>
                </li>
              </ul>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
