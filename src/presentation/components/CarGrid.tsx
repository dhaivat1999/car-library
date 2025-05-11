import type { Car } from "../../domain/car/car.model";
import CarCard from "./CarCard";
import { useState } from "react";
import CarModal from "./CarModal";

interface Props {
  cars: Car[];
  onCarClick: (car: Car) => void;
  onCarDeleteSuccess?: () => void; 
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
    <div className="pt-2 relative">
      <div
        className="w-full max-w-[1672px] mx-auto grid gap-6 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 
                  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        {cars.map((car) => (
          <CarCard
            key={car.id}
            id={car.id}
            imageUrl={car.imageUrl}
            name={car.name}
            description={car.description}
            carType={car.carType}
            tags={car.tags}
            onClick={() => handleCarClick(car)}
            onDeleteSuccess={onCarDeleteSuccess}
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
          lastUpdated="Feb 05, 2025 | 05:30pm"
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CarGrid;
