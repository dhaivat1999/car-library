import type { CarRepository } from "../../domain/car/car.repository";
import type { Car, CarFilterParams } from "../../domain/car/car.model";

const BASE_URL = "https://mock-cars-api-39814baaf6c0.herokuapp.com/api/cars";

export const carApi: CarRepository = {
    async getAllCars(params: CarFilterParams = {}) {
        const query = new URLSearchParams();

        if (params.search) query.append("search", params.search);
        if (params.carType) query.append("carType", params.carType);
        if (params.tags) query.append("tags", params.tags.join(","));
        if (params.sortBy) query.append("sortBy", params.sortBy);
        if (params.sortOrder) query.append("sortOrder", params.sortOrder);

        const res = await fetch(`${BASE_URL}?${query.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch cars");
        return res.json();
    },

    async getCarById(id: string) {
        const res = await fetch(`${BASE_URL}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch car");
        return res.json();
    },

    async createCar(car) {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(car),
        });

        if (!response.ok) {
            throw new Error("Failed to create car");
        }

        return response.json();
    },

    async updateCar(id: string, car: Partial<Omit<Car, "id">>) {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(car),
        });
        if (!res.ok) throw new Error("Failed to update car");
        return res.json();
    },

    async deleteCar(id: string) {
        const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete car");
    },

    async getCarTypes() {
        const res = await fetch(`${BASE_URL}/types`);
        if (!res.ok) throw new Error("Failed to fetch car types");
        return res.json();
    },

    async getCarTags() {
        const res = await fetch(`${BASE_URL}/tags`);
        if (!res.ok) throw new Error("Failed to fetch car tags");
        return res.json();
    },

    async resetDatabase() {
        const res = await fetch(`${BASE_URL}/reset`, { method: "POST" });
        if (!res.ok) throw new Error("Failed to reset database");
    },
};
