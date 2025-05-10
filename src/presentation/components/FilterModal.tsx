import { useState, type FC, useEffect } from "react";
import type { CarType } from "../../domain/car/car.model";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  carType: "" | CarType;
  onCarTypeChange: (value: "" | CarType) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  availableTags: string[];
  onReset: () => void;
  onApply: () => void;

  onTagsChange: (tags: string[]) => void;
}

const FilterModal: FC<FilterModalProps> = ({
  isOpen,
  onClose,
  carType,
  onCarTypeChange,
  selectedTags,
  onTagToggle,
  availableTags,
  onReset,
  onApply,
  onTagsChange,
}) => {
  const [showCarType, setShowCarType] = useState(true);
  const [showTags, setShowTags] = useState(true);

  const [localCarType, setLocalCarType] = useState<"" | CarType>(carType);
  const [localSelectedTags, setLocalSelectedTags] =
    useState<string[]>(selectedTags);

  useEffect(() => {
    if (isOpen) {
      setLocalCarType(carType);
      setLocalSelectedTags(selectedTags);
    }
  }, [isOpen, carType, selectedTags]);

  const handleApply = () => {
    onCarTypeChange(localCarType);
    onTagsChange(localSelectedTags);
    // Apply tag changes
    selectedTags.forEach((tag) => {
      if (!localSelectedTags.includes(tag)) {
        onTagToggle(tag); // removed
      }
    });
    localSelectedTags.forEach((tag) => {
      if (!selectedTags.includes(tag)) {
        onTagToggle(tag); // added
      }
    });

    onApply();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative bg-white rounded-2xl shadow-lg w-[500px] px-8 py-6 flex flex-col gap-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-4 h-[15px] text-gray-800 hover:text-gray-600"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Reset + Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Filter By</h2>
          <button
            onClick={onReset}
            className="text-sm text-gray-500 underline hover:text-gray-700"
          >
            ⟳ Reset
          </button>
        </div>

        {/* Car Type Section */}
        <div className="border-t border-b py-4">
          <button
            onClick={() => setShowCarType((prev) => !prev)}
            className="w-full flex justify-between items-center"
          >
            <p className="text-sm font-semibold">CAR TYPE</p>
            <span>{showCarType ? "▴" : "▾"}</span>
          </button>
          {showCarType && (
            <div className="mt-4 flex flex-wrap gap-2">
              {(["automatic", "manual"] as CarType[]).map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    setLocalCarType((prev) => (prev === type ? "" : type))
                  }
                  className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                    localCarType === type
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {type[0].toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tags Section */}
        <div className="border-b py-4">
          <button
            onClick={() => setShowTags((prev) => !prev)}
            className="w-full flex justify-between items-center"
          >
            <p className="text-sm font-semibold">TAGS</p>
            <span>{showTags ? "▴" : "▾"}</span>
          </button>
          {showTags && (
            <div className="mt-4 flex flex-wrap gap-2.5">
              {availableTags.map((tag) => {
                const isSelected = localSelectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() =>
                      setLocalSelectedTags((prev) =>
                        isSelected
                          ? prev.filter((t) => t !== tag)
                          : [...prev, tag]
                      )
                    }
                    className={`px-3 py-1.5 rounded-full text-sm border font-medium transition-colors ${
                      isSelected
                        ? "bg-purple-100 text-purple-800 border-purple-300"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="mt-4 px-6 py-2 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
