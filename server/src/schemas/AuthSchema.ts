import { object, string } from "yup"


export const RegisterAuthSchema = object().shape({
    name: string().required("Nome é obrigatório").min(3, 'Nomes precisam ter no minimo 3 caracteres'),
    email: string().email('Formato do e-mail inválido').required('E-mail é obrigatório'),
    password: string().required('Senha é obrigatório').min(6, 'Senhas precisam ter no minimo 6 caracteres') // melhorar validação
})


export const LoginAuthSchema = object().shape({
    email: string().email('Formato do e-mail inválido').required('E-mail é obrigatório'),
    password: string().required('Senha é obrigatório').min(6, 'Senhas precisam ter no minimo 6 caracteres') // melhorar validação
});