
export const useAuth = () => {
    const user = useState<null | { email: string; name: string, id: string }>("authUser", () => null);

    return { user }
}