import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Lottie from "lottie-react";
import { FaArrowRightToBracket } from "react-icons/fa6";
import {toast} from 'react-toastify'
import animationData from '../../assets/lottie-animations/expense-screen.json'
import {useAuth} from '../../context/AuthContext'
 
import './index.css'

const Login = () => {

    const {login} = useAuth()

    const navigate = useNavigate()

    const [user, setUser] = useState({email:"", password:""})
    const [loading, setLoading] = useState(false)

    const onLogin = async (event) => {
        event.preventDefault()
        
        setLoading(true)

        if (!user.email || !user.password) {
            toast.error("Please Enter Email and Password")
            setLoading(false)
            return
        }

        try {
            await login(user.email, user.password)
            navigate("/", {replace: true})
        } catch (err) {
            toast.error(err?.response?.data?.message || "Invalid email or password")
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (field, value) => {
        setUser(prev => ({...prev, [field]: value}))
    }

    return (
        <div className="main-form-container">
            <Lottie animationData={animationData} autoplay loop={false} className="login-img"/>
            <form className="form-container" onSubmit={onLogin}>
                <h2 className="form-title">Welcome back</h2>
                <p className="form-subtitle">Sign in to manage your expenses.</p>
                <div className="input-container">
                    <input className="input-field" id='login-email-field' type='email' required name="email" value={user.email} onChange={e=> handleChange(e.target.name, e.target.value)} placeholder=" " />
                    <label className='input-label' htmlFor='login-email-field'>Email Address</label>
                </div>
                <div className="input-container">
                    <input className="input-field" id='login-password-field' type='password' required name="password" value={user.password} onChange={e=> handleChange(e.target.name, e.target.value)} placeholder=" " />
                    <label className='input-label' htmlFor='login-password-field'>Password</label>
                </div> 
                <button type="submit" className="login-button" disabled={loading}>
                    <span>{loading? "Logging In..." : "Login"}</span>
                    <span>{!loading && <FaArrowRightToBracket className="login-icon" />}</span>
                </button>
                <p className="auth-switch-txt">Don't have an account?{" "}
                    <Link to="/register" className="auth-link-styling">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login