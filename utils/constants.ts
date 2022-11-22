export const apiUrl = {
    protocol: 'https',
    hostname: 'devapi.neonav.net',
    port: ''
};


export const authApiEnpoints = {
    login: {
        method: "post",
        path: "/api/auth"
    },
    signup: {
        method: "post",
        path: "/api/auth/user"
    },
    invite: {
        method: "post",
        path: "/api/auth/invite"
    },
    verifyUser: {
        method: "get",
        path: "/api/auth/user"
    },
    verifyEmail: {
        method: "post",
        path: "/api/auth/verify"
    },
    tokenUpdate: {
        method: "patch",
        path: "/api/auth/user"
    },
    newPassword: {
        method: "put",
        path: "/api/auth/users/"
    },
    restPassword:  {
        method: "post",
        path: "/api/auth/reset"
    },
    netCheck: {
        method: "get",
        path: "/api/auth/netcheck"       
    }
};