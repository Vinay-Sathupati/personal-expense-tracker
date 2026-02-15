import {NavLink} from 'react-router-dom'
import Lottie from 'lottie-react'
import animationData from '../../assets/lottie-animations/error-404.json'
import './index.css'
import { useRef } from 'react'

const NotFound = () => {
    const lottieRef = useRef(null)
    
    const handleLottieLoad = ()=>{
        lottieRef.current.playSegments([0, 30], true)
    }

    return (
        <div className="not-found-container">
            <div className='not-found-content'>
                <h1 className='not-found-heading'>Site Not Found</h1>
                <div className='not-found-text-button-container'>
                    <p className="not-found-text">
                        we are sorry, the page you requested could not be found.
                    </p>
                    <NavLink to="/" className="link-item">
                        <button type="button" className="go-home-button"><span>Go Back Home</span></button>
                    </NavLink>
                </div>
            </div>
            <Lottie lottieRef={lottieRef} animationData={animationData} autoplay={false} loop={false} onDOMLoaded={handleLottieLoad} className='error-lottie'/>
        </div>
    )
}

export default NotFound