import { object, string, boolean } from "yup";

export const CreateTodoSchema = object().shape({
    title: string().required("Título é obrigatório").min(3, 'Títulos precisam ter no minimo 3 caracteres'),
    description: string().optional(),
})