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
        <div className="registration-container">
            <div className="registration-form">
                <h1>Login</h1>

                <div className="registration-field">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => handleChange(e)} name="email" id="email" type={"text"} />
                </div>

                <div className="registration-field">
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => handleChange(e)} name="password" id="password" type={"password"} />
                </div>

                <div className="registration-button-container">
                    <button disabled={!login.email.length || !login.password.length}onClick={() => handleSubmit()}>Login</button>
                    <button onClick={() => navigate('/registration')}>No Account? Register Here</button>
                </div>
                {error && <p style={{color: "red"}}> Incorrect username or password!</p>}

            </div>
        </div>
    )
}

export default LoginPage