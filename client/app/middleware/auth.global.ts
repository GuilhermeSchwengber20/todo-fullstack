

export default defineNuxtRouteMiddleware(async () => {
    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase;
    const { user } = useAuth();

    if(user.value) return;


    try {
        const data = await $fetch<{user: {email: string, id: string, name: string}}>(
            `${apiBase}/auth/me`,
            { credentials: 'include' }
        )

        user.value = data.user
    } catch (error) {
        user.value = null;
    }
})