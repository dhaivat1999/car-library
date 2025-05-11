import { useEffect, useState, useCallback } from "react";
import type { Car, CarTag, CarType } from "../../domain/car/car.model";
import { carApi } from "../../infrastructure/car/car.api";
import CarGrid from "../components/CarGrid";
import { useNavigate } from "react-router-dom";
import FilterModal from "../components/FilterModal";
import SortDropdown from "../components/SortDropdown";

export const CarLibraryPage = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [carTypeFilter, setCarTypeFilter] = useState<"" | CarType>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<"a-z" | "date-modified">(
    "date-modified"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(
          "https://mock-cars-api-39814baaf6c0.herokuapp.com/api/cars/tags"
        );
        if (!response.ok) throw new Error("Failed to fetch tags");
        const data = await response.json();
        setAvailableTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleCarTypeChange = (value: "" | CarType) => {
    setCarTypeFilter(value);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleResetFilters = () => {
    setSelectedTags([]);
    setCarTypeFilter("");
  };

  const handleApplyFilters = () => {
    // Optionally add logic here if needed
  };

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const fetchCars = async () => {
    console.log("tags in this file", selectedTags);
    setLoading(true);
    try {
      const data = await carApi.getAllCars({
        search: searchQuery,
        carType: carTypeFilter || undefined,
        sortBy: sortOption === "a-z" ? "name" : "createdAt",
        sortOrder: sortDirection.toUpperCase() as "ASC" | "DESC",
        tags: selectedTags.length > 0 ? (selectedTags as CarTag[]) : undefined,
      });

      setCars(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [searchQuery, carTypeFilter, sortOption, sortDirection, selectedTags]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-purple-300 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-semibold text-gray-600">Loading cars...</p>
        </div>
      </div>
    );

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-4 mb-6 pt-10 pl-30 pr-30">
        <div className="relative w-full md:max-w-sm">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.3598 10.4163C12.1812 9.38941 12.6724 8.08681 12.6724 6.66948C12.6724 3.35426 9.98492 0.666748 6.66972 0.666748C3.3545 0.666748 0.666992 3.35426 0.666992 6.66948C0.666992 9.98467 3.3545 12.6722 6.66972 12.6722C8.08705 12.6722 9.38965 12.181 10.4166 11.3595L14.195 15.1381C14.4555 15.3985 14.8778 15.3985 15.1383 15.1381C15.3988 14.8776 15.3988 14.4553 15.1383 14.1948L11.3598 10.4163ZM6.66972 11.3449C4.08752 11.3449 1.99424 9.25167 1.99424 6.66948C1.99424 4.08728 4.08752 1.99399 6.66972 1.99399C9.25192 1.99399 11.3452 4.08728 11.3452 6.66948C11.3452 9.25167 9.25192 11.3449 6.66972 11.3449Z"
                fill="black"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search a car"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-full border border-gray-300 pl-10 pr-10 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              &times;
            </button>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-gray-100 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
            >
              <g clipPath="url(#clip0_58795_1185)">
                <path
                  d="M17.7012 1.38428H4.29953C2.94576 1.38428 2.26886 1.38428 1.8483 1.77886C1.42773 2.17345 1.42773 2.80852 1.42773 4.07865V4.73899C1.42773 5.73248 1.42773 6.22922 1.67624 6.64102C1.92475 7.05282 2.37875 7.30839 3.28676 7.81954L6.07529 9.38931C6.68452 9.7322 6.98913 9.90374 7.20723 10.0931C7.66143 10.4874 7.94104 10.9507 8.06775 11.519C8.12859 11.7919 8.12859 12.1112 8.12859 12.7498V15.3052C8.12859 16.1759 8.12859 16.6112 8.36974 16.9506C8.61091 17.29 9.03922 17.4574 9.89589 17.7924C11.6942 18.4954 12.5934 18.8469 13.2328 18.4469C13.8722 18.047 13.8722 17.1331 13.8722 15.3052V12.7498C13.8722 12.1112 13.8722 11.7919 13.9331 11.519C14.0597 10.9507 14.3393 10.4874 14.7935 10.0931C15.0116 9.90374 15.3162 9.7322 15.9255 9.38931L18.714 7.81954C19.622 7.30839 20.076 7.05282 20.3245 6.64102C20.573 6.22922 20.573 5.73248 20.573 4.73899V4.07865C20.573 2.80852 20.573 2.17345 20.1525 1.77886C19.7319 1.38428 19.055 1.38428 17.7012 1.38428Z"
                  stroke="black"
                  strokeWidth="1.4359"
                />
              </g>
              <defs>
                <clipPath id="clip0_58795_1185">
                  <rect
                    width="20.6195"
                    height="18.6667"
                    fill="white"
                    transform="translate(0.69043 0.666504)"
                  />
                </clipPath>
              </defs>
            </svg>
            Filter
          </button>

          <SortDropdown
            sortOption={sortOption}
            sortDirection={sortDirection}
            setSortOption={setSortOption}
            setSortDirection={setSortDirection}
          />
        </div>
      </div>

      {cars.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-300px)] text-center px-4">
          <img
            src="src/assets/NOT_FOUND.png"
            alt="No results found"
            className="w-24 h-24 mb-6"
          />
          <p className="text-lg font-medium text-gray-600">
            No results found{searchQuery ? ` with ‘${searchQuery}’` : ""}.
          </p>
        </div>
      ) : (
        <CarGrid
          cars={cars}
          onCarClick={() => {}}
          onCarDeleteSuccess={fetchCars}
        />
      )}

      <button
        onClick={() => navigate("/add-car")}
        className="fixed bottom-10 right-10 flex w-[164px] h-[56px] px-6 py-[17px] justify-center items-center gap-[10px] rounded-[91px] border border-white bg-[#9B72D2] shadow-[ -6px_-6px_8px_rgba(155,114,210,0.12),8px_8px_12px_rgba(155,114,210,0.16)] text-white font-semibold cursor-pointer transition-all duration-200 hover:brightness-110 hover:shadow-lg"
      >
        + Add Car
      </button>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        carType={carTypeFilter}
        onCarTypeChange={handleCarTypeChange}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        availableTags={availableTags}
        onReset={handleResetFilters}
        onApply={handleApplyFilters}
        onTagsChange={setSelectedTags}
      />
    </div>
  );
};
