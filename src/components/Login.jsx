import React, { useState } from 'react'
import "./login.css"
import { AiOutlineTwitter, AiFillApple } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc';
import Modal from './Modal';



const Login = () => {
    const [showModal, setShowModal] = useState(false)
    const [logSign, setLogSign] = useState(false)


    const handleCloseModal = () => {
        setLogSign(false)
        setShowModal(false)
    }

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleLogModal = () => {
        setLogSign(true)
        setShowModal(true)

    }



    return (
        <div className="container">
            <div className="login-pa">

                <div className="left-hero">
                    {/* <img src="https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80" alt="tweets" /> */}
                </div>
                <div className="right-hero">
                    <div className="tweet-icon">
                        <AiOutlineTwitter />
                    </div>
                    <h1>Happening Now </h1>
                    <h4>Join Twitter today</h4>
                    <button className="google-signup">
                        <FcGoogle />
                        <h6>Sign up with google</h6>
                    </button>
                    <button className="apple-signup">
                        <AiFillApple />
                        <h6>Sign up with Apple</h6>
                    </button>
                    <div className="or">
                        <p>or</p>
                    </div>
                    <button className="phone-signup" onClick={handleOpenModal}>
                        <h6>Sign up with phone or email</h6>
                    </button>
                    <p className="sub-text">By signing up, you agree to the <a href="www.www.com">Terms of Service</a> and <a href="www.www.com">Privacy Policy</a>, including <a href="www.www.com">Cookie Use.</a></p>
                    <h3>Already have an account?</h3>
                    <button className="signin-signup" onClick={handleLogModal}>
                        <h6>Sign in</h6>
                    </button>
                </div>
            </div>
            <div className="bottom-hero">
                <ul>
                    <li>About</li>
                    <li>Help center</li>
                    <li>terms of service</li>
                    <li>Privacy policy</li>
                    <li>cookie policy</li>
                    <li>accessibility</li>
                    <li>ads info</li>
                    <li>blog</li>
                    <li>status</li>
                    <li>careers</li>
                    <li>brand resources</li>
                    <li>advertising</li>
                    <li>marketing</li>
                    <li>twitter for business</li>
                    <li>developers</li>
                    <li>directory</li>
                    <li>settings</li>
                </ul>
            </div>
            <div className="copyright">
                <p>&copy; Omolade, 2022</p>
            </div>
            {showModal && <Modal handleCloseModal={handleCloseModal} data={logSign} />}

        </div>
    )
}

export default Login