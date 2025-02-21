import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext); 

  return (
    <div className="absolute top-0 left-0 w-full z-50">  {/* Fixed position at top */}
      <div className="navbar bg-black bg-opacity-30 text-white py-2"> {/* Semi-transparent background */}
        <div className="lg:w-[900px] w-[330px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <div>
            <a className="btn btn-ghost text-xl text-white">PlanSync</a>
          </div>
          
          {/* Navigation Links */}
          <div className="flex gap-x-3">
            {user?.email ? (
              <button className="btn bg-teal-500 hover:bg-teal-700 text-white " onClick={logOut}>
                Log Out
              </button>
            ) : (
              <>
                <NavLink to="/login" className="btn bg-teal-500 hover:bg-teal-700 text-white">
                  Login
                </NavLink>
                <NavLink to="/register" className="btn bg-teal-500 hover:bg-teal-700 text-white">
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
