import React, { useState } from "react";
import { useEffect } from "react";
import { carApi } from "../../infrastructure/car/car.api";
import type { Car, CarType } from "../../domain/car/car.model";
import { useNavigate } from "react-router-dom";
const AddNewCar: React.FC = () => {
  const [carName, setCarName] = useState("");
  const [description, setDescription] = useState("");
  const [carType, setCarType] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [showSpecDropdown, setShowSpecDropdown] = useState(false);
  const [carTypeDropdownOpen, setCarTypeDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const carTypes = ["automatic", "manual"];
  //   const availableSpecifications = [
  //     "Enginer: 5.0L TI-VCT V8",
  //     "Displacement: 4951 cc",
  //     "Fuel Type: Petrol",
  //     "Mileage (ARAI): 7.9 km/l",
  //   ];

  const [errors, setErrors] = useState({
    carName: false,
    carType: false,
    specifications: false,
    imageUrl: false,
  });
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
  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };
  const validateForm = () => {
    const newErrors = {
      carName: carName.trim() === "",
      carType: carType.trim() === "",
      specifications: tags.length === 0,
      imageUrl: imageUrl.trim() === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const payload = {
      name: carName,
      description,
      carType: carType as CarType,
      imageUrl, // changed from `image`
      tags,
    };
    console.log("Payload:", payload);
    try {
      setLoading(true);
      const newCar = await carApi.createCar(
        payload as Omit<Car, "id" | "createdAt" | "updatedAt">
      );
      console.log("Car added successfully:", newCar);

      // Reset form
      setCarName("");
      setDescription("");
      setCarType("");
      setTags([]);
      setImageUrl("");
      setErrors({
        carName: false,
        carType: false,
        specifications: false,
        imageUrl: false,
      });

      navigate("/cars");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong while adding the car.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-between items-start pt-10 px-20 bg-gray-100">
      <div className="flex-shrink-0 pt-6">
        <h1 className="text-4xl font-bold text-black">Add Car</h1>
      </div>

      <div className="flex-grow flex justify-center items-center">
        <div className="max-w-[520px] w-full py-8 px-6 bg-white/50 rounded-[20px] shadow-md backdrop-blur-md flex flex-col justify-start items-start gap-5">
          <div className="w-full flex flex-col gap-3">
            {/* Car Name */}
            <div className="w-full">
              <div className="flex justify-between mb-1">
                <label
                  htmlFor="carName"
                  className="text-sm font-medium text-gray-900"
                >
                  Car name<span className="text-red-500">*</span>
                </label>
                {errors.carName && (
                  <span className="text-xs text-red-500 font-medium">
                    Mandatory!
                  </span>
                )}
              </div>
              <input
                id="carName"
                type="text"
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                className={`w-full rounded-full px-4 py-2 text-sm outline-none transition-all ${
                  errors.carName
                    ? "border border-red-500 placeholder-red-300"
                    : "border border-gray-200"
                }`}
                placeholder="Enter car name"
              />
            </div>

            {/* Description */}
            <div className="w-full flex flex-col gap-1 relative">
              <label className="text-xs text-black font-normal">
                Description
              </label>
              <textarea
                maxLength={280}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter here"
                className="h-16 pl-5 pr-5 py-2 bg-white rounded-[20px] outline outline-1 outline-black/10 text-sm font-semibold text-black placeholder:opacity-30 resize-none"
              />
              <div className="absolute bottom-1 right-4 text-xs text-black opacity-30">
                {description.length}/280 char
              </div>
            </div>

            {/* Car Type */}
            <div className="w-full flex flex-col items-start gap-2">
              <div className="self-stretch flex justify-between">
                <label className="text-xs text-black font-normal">
                  Car type <span className="text-red-500">*</span>
                </label>
                {errors.carType && (
                  <span className="text-xs text-red-500 font-medium">
                    Mandatory!
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setCarTypeDropdownOpen((prev) => !prev)}
                className={`w-full pl-6 pr-5 py-4 rounded-[50px] outline outline-1 outline-offset-[-1px] flex flex-col justify-center items-start gap-2.5 ${
                  errors.carType ? "outline-red-500" : "outline-black/10"
                }`}
              >
                <div className="w-full inline-flex justify-between items-center">
                  <div
                    className={`${
                      carType ? "opacity-100" : "opacity-30"
                    } text-black text-sm font-semibold`}
                  >
                    {carType || "Select"}
                  </div>
                  <div className="w-4 h-4 flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-4 h-4 transition-transform duration-200 ${
                        carTypeDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="black"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </button>

              {carTypeDropdownOpen && (
                <div className="mt-2 w-full bg-white rounded-[10px] shadow-md outline outline-1 p-4 z-10">
                  {carTypes.map((type) => {
                    const isSelected = carType === type;
                    return (
                      <div
                        key={type}
                        onClick={() => {
                          setCarType(type);
                          setCarTypeDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 pb-3.5 cursor-pointer"
                      >
                        <div className="w-6 h-6 relative rounded">
                          {isSelected ? (
                            <>
                              <div className="w-6 h-6 absolute bg-lime-300 rounded border" />
                              <div className="w-3 h-2 absolute left-[6px] top-[8px] bg-black rounded outline outline-[0.80px] outline-offset-[-0.40px] outline-black" />
                            </>
                          ) : (
                            <div className="w-6 h-6 border border-black rounded" />
                          )}
                        </div>
                        <div className="text-sm text-black font-normal">
                          {type}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="w-full flex flex-col gap-2 relative">
              <div className="flex justify-between">
                <label className="text-xs text-black font-normal">
                  Tags <span className="text-red-500">*</span>
                </label>
                {errors.specifications && (
                  <span className="text-xs text-red-500 font-medium">
                    Mandatory!
                  </span>
                )}
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSpecDropdown((prev) => !prev)}
                  className={`w-full h-14 pl-6 pr-5 bg-white rounded-[50px] flex items-center justify-between text-sm font-semibold text-black ${
                    errors.specifications
                      ? "outline outline-1 outline-red-500"
                      : "outline outline-1 outline-black/10"
                  }`}
                >
                  {tags.length === 0 ? (
                    <span className="opacity-30">Select</span>
                  ) : (
                    <span>{tags.length} selected</span>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 transition-transform duration-200 ${
                      showSpecDropdown ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showSpecDropdown && (
                  <div className="absolute z-20 top-full mt-2 w-full bg-white rounded-[10px] shadow-md outline outline-1 p-4 max-h-60 overflow-y-auto space-y-3">
                    {availableTags.map((spec) => {
                      const isSelected = tags.includes(spec);
                      return (
                        <div
                          key={spec}
                          className="flex items-center gap-3 cursor-pointer"
                          onClick={() => toggleTag(spec)}
                        >
                          <div
                            className={`w-6 h-6 rounded border flex items-center justify-center ${
                              isSelected
                                ? "bg-lime-300 border-black"
                                : "border-black"
                            }`}
                          >
                            {isSelected && (
                              <div className="w-3 h-2 bg-black rounded outline outline-[0.80px] outline-offset-[-0.40px] outline-black" />
                            )}
                          </div>
                          <div className="text-sm text-black font-normal">
                            {spec}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {tags.map((spec) => (
                    <div
                      key={spec}
                      className="px-4 py-1.5 bg-violet-500/10 rounded-md flex items-center gap-1.5"
                    >
                      <span className="text-sm text-black font-normal">
                        {spec}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleTag(spec)}
                        className="w-4 h-4 flex items-center justify-center text-black hover:text-red-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10l-4.95-4.95A1 1 0 115.05 3.636L10 8.586z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Image URL */}
            <div className="w-full flex flex-col gap-1">
              <div className="flex justify-between">
                <label className="text-xs text-black font-normal">
                  Car Image URL <span className="text-red-500">*</span>
                </label>
                {errors.imageUrl && (
                  <span className="text-xs text-red-500 font-medium">
                    Mandatory!
                  </span>
                )}
              </div>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter here"
                className={`h-10 pl-5 pr-5 rounded-[50px] text-sm font-semibold text-black placeholder:opacity-30 ${
                  errors.imageUrl
                    ? "outline outline-1 outline-red-500"
                    : "outline outline-1 outline-black/10"
                }`}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-center mt-2">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-24 h-10 bg-violet-500 rounded-[100px] outline outline-1 outline-offset-[-1px] flex justify-center items-center gap-1.5 disabled:opacity-50"
            >
              <span className="text-white text-sm font-bold">
                {loading ? "Adding..." : "Add"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewCar;
