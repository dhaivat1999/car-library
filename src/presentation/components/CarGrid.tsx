import type { Car } from "../../domain/car/car.model";
import CarCard from "./CarCard";
import { useState } from "react";
import CarModal from "./CarModal";

interface Props {
  cars: Car[];
  onCarClick: (car: Car) => void;
  onCarDeleteSuccess?: () => void; // Optional callback for delete success
}

export const CarGrid = ({ cars, onCarClick, onCarDeleteSuccess }: Props) => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const handleCarClick = (car: Car) => {
    setSelectedCar(car);
    onCarClick(car);
  };

  const handleCloseModal = () => {
    setSelectedCar(null);
  };

  return (
    <div className="pt-[10px] relative">
      <div className="w-full max-w-[1672px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:px-16 lg:px-32">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            id={car.id} // ✅ Required for deletion
            imageUrl={car.imageUrl}
            name={car.name}
            description={car.description}
            carType={car.carType}
            tags={car.tags}
            onClick={() => handleCarClick(car)}
            onDeleteSuccess={onCarDeleteSuccess} // ✅ Optional parent handler
          />
        ))}
      </div>

      {selectedCar && (
        <CarModal
          name={selectedCar.name}
          imageUrl={selectedCar.imageUrl}
          carType={selectedCar.carType}
          description={selectedCar.description}
          tags={selectedCar.tags}
        //   specifications={[
        //     { label: "Engine", value: "5.0L Ti-VCT V8" },
        //     { label: "Displacement", value: "4951 cc" },
        //     { label: "Fuel Type", value: "Petrol" },
        //     { label: "Mileage (ARAI)", value: "7.9 km/l" },
        //   ]}
          lastUpdated="Feb 05, 2025 | 05:30pm"
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CarGrid;
