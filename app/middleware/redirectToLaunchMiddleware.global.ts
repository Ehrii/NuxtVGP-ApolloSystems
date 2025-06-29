export default defineNuxtRouteMiddleware((to) => {
    if (to.matched.length === 0 && to.path !== '/') {
        return navigateTo('/')
    }
})
//This middleware checks if the route matched is empty (i.e., no components matched)
// and if the path is not the root path ('/'). If both conditions are true, it redirects to the root path.
// This is useful for handling 404 errors or redirecting users to a default page when they try to access an invalid route.