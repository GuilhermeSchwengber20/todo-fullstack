export type Todo = {
    id: string;
    userId: string;
    title: string;
    description?: string;
    completed: boolean;
    deletedAt: Date | null;
   
    createdAt?: Date;
    updatedAt?: Date;
}