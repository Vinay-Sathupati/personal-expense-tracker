import {useNavigate, Link} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import {toast} from 'react-toastify'
import { MdLogout } from "react-icons/md";

import './index.css'


const Header = () => {
    
    const {logout} = useAuth()

    const navigate = useNavigate()

    const onClickLogout = async () => {
        try {
            const res = await logout()
            console.log(res)
            toast.success("Logged out successfully")
            navigate("/", {replace:true})
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong. Please try again.")
        }
    }

    return (
        <nav className='nav-header'>
            <div className='nav-content'>
                <div className='nav-bar-mobile-logo-container'>
                    <Link to="/" className='nav-link'><h2>Expense Tracker</h2></Link>
                    
                    <button type='button' className='nav-mobile-btn' onClick={onClickLogout}><MdLogout className='nav-bar-img'/></button>
                </div>
                
                <div className='nav-bar-large-container'>
                    <Link to="/" className='nav-link'><h2>Expense Tracker</h2></Link>
                    <ul className='nav-menu'>
                        <li className='nav-menu-item'>
                            <Link to="/" className='nav-link'>
                                Dashboard
                            </Link>
                        </li>
                        <li className='nav-menu-item'>
                            <Link to="/transactions" className='nav-link'>
                                Transactions
                            </Link>
                        </li>
                    </ul>
                    <button type='button' className='logout-desktop-btn' onClick={onClickLogout}>Logout</button>
                </div>
            </div>
            <div className='nav-menu-mobile'>
                <ul className='nav-menu-list-mobile'>
                    <li className='nav-menu-item-mobile'>
                        <Link to="/" className='nav-link'>
                            Dashboard
                        </Link>
                    </li>
                    <li className='nav-menu-item-mobile'>
                        <Link to="/transactions" className='nav-link'>
                            Transactions
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header