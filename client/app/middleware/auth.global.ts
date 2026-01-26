export default defineNuxtRouteMiddleware(async () => {
    const { user } = useAuth();

    if(user.value) return;


    try {
        const { data } = await useFetch<{email: string, name: string } | null>('/auth/me', { method: 'GET', credentials: 'include' });
        if(data.value) {
            user.value = data.value;
        }
    } catch (error) {
        user.value = null;
    }
})