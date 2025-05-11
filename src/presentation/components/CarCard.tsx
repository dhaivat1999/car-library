import { useState, type FC } from "react";
import ErrorImageSvg from "./ErrorImageSvg";
import DeleteIcon from "../../assets/DELETE_ICON.svg";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { carApi } from "../../infrastructure/car/car.api";

interface CarCardProps {
  imageUrl: string;
  name: string;
  description: string;
  carType: "automatic" | "manual";
  tags: string[];
  id: string;
  onDeleteSuccess?: () => void;
  onClick?: () => void;
}

const CarCard: FC<CarCardProps> = ({
  imageUrl,
  name,
  description,
  carType,
  id,
  tags,
  onDeleteSuccess,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await carApi.deleteCar(id);
      onDeleteSuccess?.();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <div
        onClick={onClick}
        className="w-full max-w-[15rem] pb-4 bg-Primary-White rounded-2xl shadow-[6px_12px_12px_0px_rgba(0,0,0,0.02),-6px_-2px_12px_0px_rgba(0,0,0,0.04)] flex flex-col justify-start items-start gap-2.5 cursor-pointer relative"
      >
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <div className="w-full h-36 relative">
            {!imageError ? (
              <img
                src={imageUrl}
                alt={name}
                onError={() => setImageError(true)}
                className="w-full h-36 object-cover rounded-t-2xl"
              />
            ) : (
              <div className="w-full h-36 bg-purple-50 flex items-center justify-center rounded-t-2xl">
                <ErrorImageSvg className="opacity-20" />
              </div>
            )}
            <div
              className={`absolute top-2 right-4 px-2 py-1 rounded-md outline outline-[1.25px] outline-offset-[-1.25px] ${
                carType === "automatic"
                  ? "bg-orange-100 text-stone-500"
                  : "bg-emerald-100 text-green-600"
              }`}
            >
              <span className="text-sm font-normal">
                {carType === "automatic" ? "Automatic" : "Manual"}
              </span>
            </div>
          </div>

          <div className="w-full px-3 flex flex-col justify-start items-start gap-2">
            <div className="w-full flex justify-between items-center">
              <span className="text-Primary-Black text-base font-bold">
                {name}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirm(true);
                }}
                className="flex justify-center items-center"
              >
                <img src={DeleteIcon} alt="Delete" className="w-4 h-4" />
              </button>
            </div>
            <p className="text-Primary-Black text-xs font-normal leading-4 line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </div>

      {showConfirm && (
        <DeleteConfirmModal
          carName={name}
          onCancel={() => !isDeleting && setShowConfirm(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};

export default CarCard;
