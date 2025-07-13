import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl font-serif tracking-wide">
          ✨Matcha
        </a>
      </div>
      {user && (
        <div className="flex items-center gap-2 mr-5">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={
                    user.User.profilePicture ||
                    "https://via.placeholder.com/150"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a href="#profile" className="justify-between">
                  Profile <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a href="#settings">Settings</a>
              </li>
              <li>
                <a href="#logout">Logout</a>
              </li>
            </ul>
          </div>

          <p className="font-serif text-base tracking-wide">
            {user.User.firstName || "Anonymous"}
          </p>
        </div>
      )}
    </div>
  );
};

export default NavBar;
