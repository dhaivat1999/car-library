import { useState, useEffect, useRef, type FC } from "react";
import ErrorImageSvg from "./ErrorImageSvg";

interface CarModalProps {
  name: string;
  imageUrl: string;
  carType: "automatic" | "manual";
  description: string;
  lastUpdated: string;
  onClose: () => void;
  tags: string[];
}

const CarModal: FC<CarModalProps> = ({
  name,
  imageUrl,
  carType,
  description,
  lastUpdated,
  onClose,
  tags,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm">
      <div
        ref={modalRef}
        className={`relative bg-white rounded-[20px] pt-4 px-8 pb-6 flex flex-row items-start justify-center transform transition-all duration-200 ${
          isVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{
          boxShadow:
            "0 15px 40px rgba(0, 0, 0, 0.25), 0 5px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex flex-col gap-4 items-start w-[650px] relative">
          {/* Header */}
          <div className="flex items-end justify-between w-full relative">
            <h2 className="text-Primary-Black text-[30px] font-bold w-[495px] h-[65px] flex items-end">
              {name}
            </h2>
            <button
              onClick={handleClose}
              className="absolute top-0 right-0 w-4 h-[15px] text-Primary-Black hover:text-gray-700 transition-colors"
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
          </div>

          {/* Content */}
          <div className="flex flex-col gap-8 w-full">
            {/* Image */}
            {!imageError ? (
              <img
                src={imageUrl}
                alt={name}
                onError={() => setImageError(true)}
                className="w-[650px] h-[230px] object-cover rounded-2xl"
              />
            ) : (
              <div className="w-[650px] h-[230px] bg-purple-50 flex items-center justify-center rounded-2xl">
                <ErrorImageSvg className="opacity-20" />
              </div>
            )}

            {/* Car Type Badge */}
            <div
              className={`inline-flex self-start rounded-md border pt-1.5 px-3 pb-1.5 text-xs font-normal ${
                carType === "automatic"
                  ? "bg-orange-100 text-stone-500"
                  : "bg-emerald-100 text-green-600"
              }`}
            >
              {carType === "automatic" ? "Automatic" : "Manual"}
            </div>

            {/* Description */}
            <div className="w-full">
              <h3 className="text-Primary-Black text-sm font-extrabold uppercase tracking-wider">
                Description
              </h3>
              <p className="text-Primary-Black text-base leading-[22px] mt-1">
                {description}
              </p>
            </div>

            {/* Divider */}
            <hr className="border-Primary-Black opacity-10 w-full" />

            {/* Tags */}
            <div className="w-full">
              <h3 className="text-Primary-Black text-sm font-extrabold uppercase tracking-wider">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2.5 mt-2">
                {tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="rounded-md border border-[#9b72d2] pt-1 px-2 pb-1.5 text-sm text-Primary-Black"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Last Updated */}
            <p className="text-sm italic text-Primary-Black opacity-50 mt-4">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarModal;
