import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Lottie from "lottie-react";
import {toast} from 'react-toastify'
import animationData from '../../assets/lottie-animations/expense-screen.json'
import {useAuth} from '../../context/AuthContext'
import './index.css'

const Register = () => {
    
    const {register} = useAuth()

    const navigate = useNavigate()

    const [newUser, setNewUser] = useState({name:"", email:"", password:""})
    const [loading, setLoading] = useState(false)

    const onRegister = async (event) => {
        event.preventDefault()
        setLoading(true)

        if (!newUser.name || !newUser.email || !newUser.password) {
            toast.error("Please enter user details")
            setLoading(false)
            return
        }

        if (newUser.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            setLoading(false);
            return;
        }

        try {
            await register(newUser.name, newUser.email, newUser.password)
            toast.success("Registration successful")
            navigate("/login", {replace: true})

        } catch (err) {
            toast.error(err?.response?.data?.message || "Invalid details")
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (field, value) => {
        setNewUser(prev => ({...prev, [field]: value}))
    }

    return (
        <div className="main-form-container">
            <Lottie animationData={animationData} autoplay loop={false} className="login-img"/>
            <form className="form-container" onSubmit={onRegister}>
                <h2 className="form-title">Create Your Account</h2>
                <p className="form-subtitle">Create an account to start tracking your expenses.</p>
                <div className="input-container">
                    <input className="input-field" id='register-name-field' type='text' required name="name" value={newUser.name} onChange={e=> handleChange(e.target.name, e.target.value)} placeholder=" " />
                    <label className='input-label' htmlFor='register-name-field'>Full Name</label>
                </div>
                <div className="input-container">
                    <input className="input-field" id='register-email-field' type='email' required name="email" value={newUser.email} onChange={e=> handleChange(e.target.name, e.target.value)} placeholder=" " />
                    <label className='input-label' htmlFor='register-email-field'>Email Address</label>
                </div>
                <div className="input-container">
                    <input className="input-field" id='register-password-field' type='password' required name="password" value={newUser.password} onChange={e=> handleChange(e.target.name, e.target.value)} placeholder=" " />
                    <label className='input-label' htmlFor='register-password-field'>Password</label>
                </div> 
                <button type="submit" className="login-button" disabled={loading}>
                    <span>{loading? "Signing up..." : "Sign Up"}</span>
                </button>
                <p className="auth-switch-txt">Already have an account?{" "}
                    <Link to="/login" className="auth-link-styling">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    )

}

export default Register