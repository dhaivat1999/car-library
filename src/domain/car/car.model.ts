export type CarType = 'automatic' | 'manual';

// Define all possible tags as a union type
export type CarTag =
    | 'american' | 'british' | 'compact' | 'electric' | 'exotic'
    | 'family' | 'german' | 'hypercar' | 'italian' | 'japanese'
    | 'korean' | 'luxury' | 'muscle' | 'offroad' | 'performance'
    | 'sedan' | 'sports' | 'supercar' | 'suv' | 'swedish'
    | 'truck' | 'utility' | 'wagon';

export interface Car {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    carType: CarType;
    tags: CarTag[]; // More specific than string[]
    createdAt: string;
    updatedAt?: string; // Optional as it's not in all responses
}

// For filter parameters
export interface CarFilterParams {
    search?: string;
    carType?: CarType;
    tags?: CarTag[];
    sortBy?: 'name' | 'createdAt';
    sortOrder?: 'ASC' | 'DESC';
}