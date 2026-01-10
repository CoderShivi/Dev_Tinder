import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice"; // adjust path if needed
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const NavBar = () => {
  const user = useSelector((store) => store.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
    try{
      await axios.post(BASE_URL + "/logout",{},{withCredentials:true})
    dispatch(removeUser());
    return navigate("/login");
    }
    catch(err){

    }
  };

  return (
    <div className="navbar fixed top-0 z-50 bg-base-100 shadow-md px-6">
      {/* Logo */}
      <div className="flex-1">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-primary"
        >
          🧑‍💻 DevTinder
        </Link>
      </div>

      {/* User Section */}
      {user && (
        <div className="flex items-center gap-3">
          {/* User Info */}
          <div className="hidden md:flex flex-col text-right">
            <span className="text-sm font-semibold">
              {user.firstName} {user.lastName}
            </span>
            <span className="text-xs text-gray-500">{user.emailId}</span>
          </div>

          {/* Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-primary">
                <img
                  src={user.photoUrl || "https://i.pravatar.cc/150"}
                  alt="profile"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile">👤 Profile</Link>
              </li>

              <li>
                <Link to="/settings">⚙️ Settings</Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500"
                >
                  🚪 Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
