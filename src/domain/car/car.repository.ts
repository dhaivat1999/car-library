import type { Car, CarFilterParams, CarType, CarTag } from "./car.model";

export interface CarRepository {
    getAllCars(params?: CarFilterParams): Promise<Car[]>;
    getCarById(id: string): Promise<Car>;
    createCar(car: Omit<Car, "id" | "createdAt" | "updatedAt">): Promise<Car>;
    updateCar(id: string, car: Partial<Omit<Car, "id">>): Promise<Car>;
    deleteCar(id: string): Promise<void>;
    getCarTypes(): Promise<CarType[]>;
    getCarTags(): Promise<CarTag[]>;
    resetDatabase(): Promise<void>;
}