import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import './modal.css'
import ModalSignup from './ModalSignup';
import ModalLogin from './ModalLogin';


const url = 'https://twiteer-app.herokuapp.com'

const Modal = ({ handleCloseModal, data }) => {
    const [signUpData, setSignUpDate] = useState({ email: '', password: '' })
    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const [isEnabled, setIsEnabled] = useState(false)
    const [isLogin, setIsLogin] = useState(data)
    const [err, setErr] = useState({ errorState: false, errorMsg: "" })

    const history = useNavigate()

    const emailErr = useRef(null)
    const passErr = useRef(null)

    const handleSignUp = async () => {
        const response = await fetch(`${url}/users/signup`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(signUpData)
        })
        const data = await response.json()
        if (response.status === 201) {
            alert(`successful signup`)
            setIsLogin(true)
        }
        if (response.status === 400) {
            if (data.message.split(" ").includes("email")) {
                emailErr.current.style.border = "1px solid red"
                setErr({ error: true, errorMsg: data.message })
                setTimeout(() => emailErr.current.style.border = "1px solid #BDBDBD", 3000)
                setTimeout(() => setErr({ error: false, errorMsg: "" }), 3000)

            }
            if (data.message.split("").includes("password")) {
                passErr.current.style.border = "1px solid red"
                setErr({ error: true, errorMsg: data.message })
                setTimeout(() => passErr.current.style.border = "1px solid #BDBDBD", 3000)
                setTimeout(() => setErr({ error: false, errorMsg: "" }), 3000)
            }
        }
        if (response.status === 500) {
            if (data.message.split(" ").includes("key")) {
                emailErr.current.style.border = "1px solid red";
                setErr({ error: true, errorMsg: "email already in use, try another" })
                setTimeout(() => emailErr.current.style.border = "1px solid #BDBDBD", 3000)
                setTimeout(() => setErr({ error: false, errorMsg: "" }), 3000)
            }
        }

    }

    const handleLogin = async () => {
        const response = await fetch(`${url}/users/login`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
        const data = await response.json()
        console.log(data)
        if (response.status === 201) {
            alert(`successful login`)
            localStorage.setItem('token', JSON.stringify(data.data.token))
            localStorage.setItem('id', JSON.stringify(data.data.user.id))
            history('/home')
        }
        if (response.status === 400) {
            if (data.message.split(" ").includes("email")) {
                emailErr.current.style.border = "1px solid red"
                setErr({ error: true, errorMsg: data.message })
                setTimeout(() => emailErr.current.style.border = "1px solid #BDBDBD", 3000)
                setTimeout(() => setErr({ error: false, errorMsg: "" }), 3000)

            }
            if (data.message.split(" ").includes("password")) {
                console.log("shit")
                passErr.current.style.border = "1px solid red"
                setErr({ error: true, errorMsg: data.message })
                setTimeout(() => passErr.current.style.border = "1px solid #BDBDBD", 3000)
                setTimeout(() => setErr({ error: false, errorMsg: "" }), 3000)
            }
            if (data.message.split(" ").includes("invalid")) {
                console.log("shit")
                passErr.current.style.border = "1px solid red"
                setErr({ error: true, errorMsg: data.message })
                setTimeout(() => passErr.current.style.border = "1px solid #BDBDBD", 3000)
                setTimeout(() => setErr({ error: false, errorMsg: "" }), 3000)
            }
        }


    }



    const handleLoginChange = (e) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;
        const newData = { ...loginData, [name]: value }
        setLoginData(newData)
        if (value) {
            setIsEnabled(true)
        } else {
            setIsEnabled(false)
        }
    }

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value
        const newData = { ...signUpData, [name]: value }
        setSignUpDate(newData)

    }

    useEffect(() => {
        if (signUpData.email && signUpData.password) {
            setIsEnabled(true)
        } else {
            setIsEnabled(false)
        }
    }, [signUpData.email, signUpData.password])


    return (
        <>
            {isLogin ? <ModalLogin setLoginData={setLoginData} loginData={loginData} handleInputChange={handleLoginChange} handleCloseModal={handleCloseModal} isEnabled={isEnabled} setIsEnabled={setIsEnabled} emailErr={emailErr} passErr={passErr} handleLogin={handleLogin} setIsLogin={setIsLogin} setErr={setErr} err={err} /> :
                <ModalSignup handleInputChange={handleInputChange} handleSignUp={handleSignUp} handleCloseModal={handleCloseModal} setIsEnabled={setIsEnabled} signUpData={signUpData} isEnabled={isEnabled} emailErr={emailErr} passErr={passErr} setErr={setErr} err={err} />}
        </>
    )
}

export default Modal