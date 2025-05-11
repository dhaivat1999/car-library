import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Car Library", path: "/cars" },
  { label: "Services", path: "/services" },
  { label: "Special Offers", path: "/offers" },
  { label: "Recycle Bin", path: "/recycle-bin" },
];

const Header = () => {
  return (
    <div className="w-full h-20 px-4 sm:px-8 md:px-16 lg:px-32 py-5 bg-white shadow-md flex justify-between items-center relative">
      <div className="flex items-center gap-3.5">
        <img
          src="src/assets/HEADER_IMAGE.svg"
          alt="Logo"
          className="w-20 h-10 object-contain"
        />
        <span className="text-black text-xl sm:text-2xl font-medium">
          DriveSphere
        </span>
      </div>

      <div className="hidden md:flex items-center gap-6 lg:gap-10">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-start relative ${
                isActive
                  ? "text-[#9B72D2] font-bold"
                  : "text-gray-800 font-normal"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="text-sm sm:text-base">{item.label}</span>
                {isActive && (
                  <div className="w-[50%] h-0.5 absolute bottom-[-6px] left-0 bg-[#9B72D2] rounded-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="hidden sm:flex px-4 sm:px-5 py-2.5 bg-[#9B72D2] rounded-full items-center">
        <span className="text-white text-sm sm:text-base font-normal">
          Contact Us
        </span>
      </div>
    </div>
  );
};

export default Header;
