import { useEffect, useState } from "react";
import type { Car, CarType } from "../../domain/car/car.model";
import { carApi } from "../../infrastructure/car/car.api";
import CarGrid from "../components/CarGrid";
import { useNavigate } from "react-router-dom";
import FilterModal from "../components/FilterModal";
import SortDropdown from "../components/SortDropDown";

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
    // Add logic if needed
  };

  const fetchCars = async () => {
    setLoading(true);
    try {
      const data = await carApi.getAllCars({
        search: searchQuery,
        carType: carTypeFilter || undefined,
        sortBy: sortOption === "a-z" ? "name" : "createdAt",
        sortOrder: sortDirection.toUpperCase() as "ASC" | "DESC",
      });
      setCars(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [searchQuery, carTypeFilter, sortOption, sortDirection]);

  if (loading) return <div className="p-8">Loading cars...</div>;

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-4 mb-6 pt-10 pl-30 pr-30">
        <input
          type="text"
          placeholder="Search a car"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:max-w-sm rounded-full border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
        />

        <div className="flex gap-4">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2  rounded-full bg-white hover:bg-gray-100 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
            >
              <g clip-path="url(#clip0_58795_1185)">
                <path
                  d="M17.7012 1.38428H4.29953C2.94576 1.38428 2.26886 1.38428 1.8483 1.77886C1.42773 2.17345 1.42773 2.80852 1.42773 4.07865V4.73899C1.42773 5.73248 1.42773 6.22922 1.67624 6.64102C1.92475 7.05282 2.37875 7.30839 3.28676 7.81954L6.07529 9.38931C6.68452 9.7322 6.98913 9.90374 7.20723 10.0931C7.66143 10.4874 7.94104 10.9507 8.06775 11.519C8.12859 11.7919 8.12859 12.1112 8.12859 12.7498V15.3052C8.12859 16.1759 8.12859 16.6112 8.36974 16.9506C8.61091 17.29 9.03922 17.4574 9.89589 17.7924C11.6942 18.4954 12.5934 18.8469 13.2328 18.4469C13.8722 18.047 13.8722 17.1331 13.8722 15.3052V12.7498C13.8722 12.1112 13.8722 11.7919 13.9331 11.519C14.0597 10.9507 14.3393 10.4874 14.7935 10.0931C15.0116 9.90374 15.3162 9.7322 15.9255 9.38931L18.714 7.81954C19.622 7.30839 20.076 7.05282 20.3245 6.64102C20.573 6.22922 20.573 5.73248 20.573 4.73899V4.07865C20.573 2.80852 20.573 2.17345 20.1525 1.77886C19.7319 1.38428 19.055 1.38428 17.7012 1.38428Z"
                  stroke="black"
                  stroke-width="1.4359"
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

      <CarGrid
        cars={cars}
        onCarClick={() => {}}
        onCarDeleteSuccess={fetchCars}
      />

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
