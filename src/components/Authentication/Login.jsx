import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import GoogleAuth from './GoogleAuth';
import useAuth from '../../hooks/useAuth';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');

    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const { handleSubmit, register, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const { email, password } = data;
        setLoginError('');

        signIn(email, password)
            .then(result => {
                console.log(result.user);
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.log(err);
                setLoginError('Invalid email or password');
            });
    };

    return (
        <div className="min-h-screen text-white flex items-center justify-center overflow-hidden">
            <motion.div
                initial={{ y: -120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{type: 'spring', stiffness: 80, damping: 12, duration: 0.6, ease: 'easeOut' }}
                className="w-[90%] md:w-[70%] max-w-md"
            >
                <div className="bg-white text-black rounded-2xl shadow-xl p-10">
                    <div className="flex flex-col items-center mb-6">
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 pt-4 font-exo">Login Now</h2>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4">
                        <div>
                            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
                                Email
                            </label>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                placeholder="you@example.com"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">Email is required</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    {...register('password', { required: true })}
                                    type={showPassword ? 'text' : 'password'}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    className="absolute top-4 right-3 cursor-pointer bg-[#7039E6] p-1 rounded-full text-white"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">Password is required</p>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <Link
                                to="/forgot-password"
                                className="text-[#FF02CB] text-sm font-medium hover:text-[#FF0000] hover:underline transition"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {loginError && (
                            <p className="text-red-500 text-sm text-center">{loginError}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full hover:scale-105 btn-gradient text-white md:text-xl font-bold py-3 rounded-xl transition duration-300 cursor-pointer"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-4">
                        <p className='text-center font-medium'>Or login with</p>
                        <GoogleAuth></GoogleAuth>
                    </div>

                    <div className="flex justify-center items-center gap-1.5 mt-4">
                        <p className="text-sm text-gray-700">Don't have an account?</p>
                        <Link
                            to="/register"
                            className="text-[#FF02CB] text-sm font-medium hover:text-[#FF0000] hover:underline hover:scale-105 transition"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;