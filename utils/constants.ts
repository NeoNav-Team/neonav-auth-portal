export const apiUrl = {
    protocol: 'https',
    hostname: process.env.API_DOMAIN || 'devapi.neonav.net',
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
    changePassword: {
        method: "put",
        path: "/api/auth/users/$userid"
    },
    resetPassword:  {
        method: "post",
        path: "/api/auth/reset"
    },
    netCheck: {
        method: "get",
        path: "/api/auth/netcheck"       
    },
    profile: {
        method: "get",
        path: "/api/user"       
    },
};