import React, { useState } from "react"
import { useNavigate } from 'react-router'
import axios, { AxiosError } from 'axios'

type Registration = {
    name: string,
    email: string,
    password: string
}

const RegistrationPage = () => {
    const [registration, setRegistration] = useState<Registration>({name: '', email: '', password: ''})
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const field = e.target.name as keyof Registration
        setRegistration((prevState) => ({
            ...prevState,
            [field]: e.target.value
        }))}

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:5001/api/users", registration)
            navigate('/')
        } catch(e){
            const error = e as AxiosError;
            throw new Error("Error with registration: " + error)
        }
    }

    return (
        <div className="registration-container">
            <div className="registration-form">

                <h1>Register</h1>

                <div className="registration-field">
                    <label htmlFor="name">Name</label>
                    <input onChange={(e) => handleChange(e)} name="name" id="name" type={"text"} />
                </div>

                <div className="registration-field">
                    <label htmlFor="email">Email Address </label>
                    <input onChange={(e) => handleChange(e)} name="email" id="email" type={"text"} />
                </div>
                <div className="registration-field">
                    <label htmlFor="password">Password </label>
                    <input onChange={(e) => handleChange(e)} name="password" id="password" type={"password"} />
                </div>

                <div className="registration-button-container">
                    <button disabled={!registration.email.length || !registration.password.length || !registration.name.length} onClick={() => handleSubmit()}>Register</button>
                    <button onClick={() => navigate('/')}>Have an Account? Login Here</button>
                </div>
            </div>
        </div>
    )
}

export default RegistrationPage