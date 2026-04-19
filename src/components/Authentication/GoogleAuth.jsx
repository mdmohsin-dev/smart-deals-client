import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";


const GoogleAuth = () => {

    const navigate = useNavigate()
    const { googleLogin } = useAuth()

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {

                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.displayURL
                }

                // save user in the database
                fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                    })

                    navigate("/")
            })


            .catch(err => console.log(err))
    }

    return (
        <div className="flex justify-center my-4">
            <button onClick={handleGoogleLogin}
                className="cursor-pointer"><FcGoogle size={35}></FcGoogle></button>
        </div>
    );
};

export default GoogleAuth;