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
