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
    <div className="w-full h-20 px-8 sm:px-16 md:px-32 py-5 bg-Primary-White shadow-[0px_8px_18px_0px_rgba(0,0,0,0.08)] flex justify-between items-center relative">
      {/* Logo Section */}
      <div className="flex justify-start items-center gap-3.5">
        <img
          src="src/assets/HEADER_IMAGE.svg"
          alt="Logo"
          className="w-20 h-10 relative"
        />
        <span className="text-black text-3xl font-medium ">DriveSphere</span>
      </div>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-10">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col justify-center items-start relative ${
                isActive
                  ? "text-[#9B72D2] font-bold"
                  : "text-Primary-Black font-normal"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="text-base">{item.label}</span>
                {isActive && (
                  <div className="w-[50%] h-0.5 absolute bottom-[-7px] left-0 bg-[#9B72D2] rounded-[20px] transition-all duration-300" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Contact Button */}
      <div className="px-5 py-2.5 bg-[#9B72D2] rounded-[30px] flex justify-start items-center gap-2.5">
        <span className="text-white text-base font-normal">Contact Us</span>
      </div>
    </div>
  );
};

export default Header;
