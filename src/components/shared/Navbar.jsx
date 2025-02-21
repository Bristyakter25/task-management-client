import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext); // Assuming you have a logOut function in your AuthContext

  const links = (
    <>
      
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">PlanSync</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-x-3">
          {user && user?.email ? (
            <>
              <button className="btn" onClick={logOut}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <button className="btn">
                <NavLink to="/login">Login</NavLink>
              </button>
              <button className="btn">
                <NavLink to="/register">Register</NavLink>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
