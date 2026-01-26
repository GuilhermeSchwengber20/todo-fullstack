
export const useAuth = () => {
    const user = useState<null | { email: string; name: string }>("authUser", () => null);

    return { user }
}