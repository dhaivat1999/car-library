import { useState, useRef, useEffect } from "react";

const SortDropdown = ({
  sortOption,
  sortDirection,
  setSortOption,
  setSortDirection,
}: {
  sortOption: "a-z" | "date-modified";
  sortDirection: "asc" | "desc";
  setSortOption: (option: "a-z" | "date-modified") => void;
  setSortDirection: (dir: "asc" | "desc") => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSortChange = (option: "a-z" | "date-modified") => {
    if (sortOption === option) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortOption(option);
      setSortDirection(option === "a-z" ? "asc" : "desc");
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-gray-100 shadow-md transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="14"
          viewBox="0 0 18 14"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.9616 0.5C13.1625 0.5 13.355 0.579175 13.4948 0.71945L17.4567 4.69167C17.7424 4.97802 17.7352 5.43528 17.4406 5.7129C17.146 5.99062 16.6757 5.98359 16.3902 5.69721L13.7044 3.00447V12.7778C13.7044 13.1766 13.3718 13.5 12.9616 13.5C12.5513 13.5 12.2187 13.1766 12.2187 12.7778V3.00447L9.53294 5.69721C9.24738 5.98359 8.77711 5.99062 8.48254 5.7129C8.18797 5.43528 8.18074 4.97802 8.46639 4.69167L12.4283 0.71945C12.5681 0.579175 12.7606 0.5 12.9616 0.5ZM5.03776 0.5C5.44803 0.5 5.78062 0.823353 5.78062 1.22222V10.9955L8.46639 8.30279C8.75195 8.01641 9.22223 8.00938 9.51679 8.2871C9.81136 8.56472 9.81859 9.02193 9.53294 9.30832L5.57107 13.2805C5.43115 13.4208 5.23874 13.5 5.03776 13.5C4.83679 13.5 4.64438 13.4208 4.50447 13.2805L0.542572 9.30832C0.256958 9.02193 0.264199 8.56472 0.558727 8.2871C0.853264 8.00938 1.32355 8.01641 1.60917 8.30279L4.29491 10.9955V1.22222C4.29491 0.823353 4.6275 0.5 5.03776 0.5Z"
            fill="black"
          />
        </svg>
        Sort
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl ring-1 ring-black/5 z-10 transition-all duration-200 ease-out animate-fade-in">
          <button
            onClick={() => handleSortChange("a-z")}
            className="flex justify-between items-center w-full px-4 py-2 text-sm text-left rounded-md hover:bg-gray-100"
          >
            <span>Sort by A - Z</span>
            {sortOption === "a-z" && (
              <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
            )}
          </button>
          <button
            onClick={() => handleSortChange("date-modified")}
            className="flex justify-between items-center w-full px-4 py-2 text-sm text-left rounded-md hover:bg-gray-100"
          >
            <span>Sort by Date Modified</span>
            {sortOption === "date-modified" && (
              <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
