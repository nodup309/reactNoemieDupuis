export type Dog = {
    id: number;
    name: string;
    imageUrl: string;
    rank: number;
};

export const createDog = (id: number, imageUrl: string): Dog => ({
    id,
    imageUrl,
    name: `Chien ${id}`,
    rank: 5,
});
