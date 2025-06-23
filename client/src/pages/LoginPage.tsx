import axios, { AxiosError } from "axios"
import React, {useState} from "react"
import { useNavigate } from "react-router"

type Login = {
    email: string,
    password: string
}

const LoginPage = () => {
    const [login, setLogin] = useState<Login>({email: '', password: ''})
    const [error, setError] = useState<boolean>(false)
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const field = e.target.name as keyof Login
        setLogin((prevState) => ({
            ...prevState,
            [field]: e.target.value
        }))}
        
    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:5001/api/auth", login, {
                withCredentials: true
            });
            setError(false);
            navigate('/dashboard');
        } catch(e){
            const error = e as AxiosError;
            if (error.status === 400){
                setError(true);
            }
        }
    }


    return (
        <div>
            <label htmlFor="email">Email Address </label>
            <input onChange={(e) => handleChange(e)} name="email" id="email" type={"text"} />
            <label htmlFor="password">Password </label>
            <input onChange={(e) => handleChange(e)} name="password" id="password" type={"password"} />
            <button disabled={!login.email.length || !login.password.length}onClick={() => handleSubmit()}>Login</button>
            <button onClick={() => navigate('/registration')}>No Account? Register Here</button>
            {error && <p style={{color: "red"}}> Incorrect username or password!</p>}
        </div>
    )
}

export default LoginPage