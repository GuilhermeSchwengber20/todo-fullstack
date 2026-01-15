import { object, string } from "yup";

export const CreateTaskSchema = object().shape({
    title: string().required("Título é obrigatório").min(3, 'Títulos precisam ter no minimo 3 caracteres'),
    description: string().optional(),
})



export const UpdateTaskShema = object().shape({
    title: string().required("Título é obrigatório").min(3, 'Títulos precisam ter no minimo 3 caracteres'),
    description: string().optional(),
})