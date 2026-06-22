import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import GoogleAuth from './GoogleAuth';
import useAuth from '../../hooks/useAuth';

const inputClass =
    'w-full border border-[#F1F5F9] bg-[#F8FAFC] rounded-xl px-4 py-3 text-sm text-gray-900 ' +
    'focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-200 placeholder:text-gray-400';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');

    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const { handleSubmit, register, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const { email, password } = data;
        setLoginError('');
        loginUser(email, password)
            .then(result => {
                console.log(result.user);
                navigate(from, { replace: true });
            })
            .catch(() => setLoginError('Invalid email or password'));
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{ background: 'linear-gradient(160deg, #FFF7ED 0%, #FDF2FF 50%, #EEF2FF 100%)' }}
        >
            <motion.div
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 80, damping: 14 }}
                className="w-full max-w-md bg-white rounded-3xl p-8 md:p-10"
                style={{ border: '1px solid rgba(0,0,0,0.06)' }}
            >
                {/* Header */}
                <span
                    className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
                    style={{ background: 'linear-gradient(135deg,#FDE68A,#FCA5A5)', color: '#92400E' }}
                >
                    ✦ Welcome back
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-1 font-exo">Sign in</h2>
                <p className="text-sm text-gray-400 mb-7">Good to see you again</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-600">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className={inputClass}
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs">Email is required</p>}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-600">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register('password', { required: true })}
                                className={inputClass + ' pr-11'}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-white cursor-pointer"
                                style={{ background: '#7C3AED' }}
                                tabIndex={-1}
                            >
                                {showPassword ? <FaEye size={11} /> : <FaEyeSlash size={11} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs">Password is required</p>}
                    </div>

                    {/* Forgot */}
                    <div className="flex justify-end -mt-1">
                        <Link
                            to="/forgot-password"
                            className="text-xs font-semibold text-orange-500 hover:text-orange-600 transition"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    {loginError && (
                        <p className="text-red-500 text-xs text-center">{loginError}</p>
                    )}

                    {/* Submit */}
                    <motion.button
                        type="submit"
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3.5 rounded-xl bg-linear-to-r from-blue-600 to-violet-600 hover:rounded-3xl transition-all duration-300 font-extrabold text-sm tracking-wide cursor-pointer text-white"
                    >
                        Login
                    </motion.button>
                </form>

                {/* Divider */}
                <p className="text-center text-xs text-gray-300 tracking-widest my-5">— or continue with —</p>

                {/* Google */}
                <GoogleAuth />

                {/* Register link */}
                <p className="text-center text-xs text-gray-400 mt-5">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-violet-500 font-semibold hover:text-violet-700 transition">
                        Register
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;