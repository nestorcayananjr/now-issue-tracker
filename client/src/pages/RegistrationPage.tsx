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
        <div>
            <label htmlFor="name">Name</label>
            <input onChange={(e) => handleChange(e)} name="name" id="name" type={"text"} />
            <label htmlFor="email">Email Address </label>
            <input onChange={(e) => handleChange(e)} name="email" id="email" type={"text"} />
            <label htmlFor="password">Password </label>
            <input onChange={(e) => handleChange(e)} name="password" id="password" type={"password"} />
            <button disabled={!registration.email.length || !registration.password.length || !registration.name.length} onClick={() => handleSubmit()}>Login</button>
            <button onClick={() => navigate('/')}>Have an Account? Login Here</button>
        </div>
    )
}

export default RegistrationPage