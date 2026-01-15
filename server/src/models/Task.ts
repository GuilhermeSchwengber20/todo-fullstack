export type Task = {
    id: string;
    userId: string;
    title: string;
    description?: string | null;
    completed: boolean;
    deletedAt: Date | null;
   
    createdAt?: Date | null;
    updatedAt?: Date | null;
}