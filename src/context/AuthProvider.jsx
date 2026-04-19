import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider()

    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            // if (currentUser) {
            //     const loggedUser = { email: currentUser.email }
            //     fetch("http://localhost:3000/getToken", {
            //         method: "POST",
            //         headers: {
            //             'content-type': 'application/json'
            //         },
            //         body: JSON.stringify(loggedUser)
            //     })
            //         .then(res => res.json())
            //         .then(data => {
            //             localStorage.setItem("token", data.token)
            //         })
            // }
            // else {
            //     localStorage.removeItem("token")
            // }
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])


    const userInfo = {
        createUser, loginUser, googleLogin, loading, user, logout
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;