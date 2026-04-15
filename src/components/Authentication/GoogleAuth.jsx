import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";


const GoogleAuth = () => {

    const { googleLogin } = useAuth()

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result.user)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="flex justify-center my-4">
            <button onClick={handleGoogleLogin}
                className="cursor-pointer"><FcGoogle size={34}></FcGoogle></button>
        </div>
    );
};

export default GoogleAuth;