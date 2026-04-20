import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
    baseURL: 'http://localhost:3000'
})

const navigate = useNavigate()

const useAxiosSecure = () => {
    const { user, logout } = useAuth()

    useEffect(() => {
        const requestInterceptor = instance.interceptors.request.use((config) => {
            const token = user.accessToken
            if (token) {
                config.headers.authorization = `Bearer ${token}`
            }
            return config
        })


        const responseInterceptor = instance.interceptors.response.use(res => {
            return res
        }, err => {
            if (err.status === 401 || err.status === 403) {
                logout()
                    .then(() => {
                        navigate("/login")
                    })
            }
        })

        return () => {
            instance.interceptors.request.eject(requestInterceptor)
            instance.interceptors.response.eject(responseInterceptor)
        }
    }, [])
};

export default useAxiosSecure;