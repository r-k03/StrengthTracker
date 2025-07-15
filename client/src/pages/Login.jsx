import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router"

function Login(){

    const navigate = useNavigate()

    async function handleLogin(formData){
        try {
            const email = formData.get("email");
            const password = formData.get("password");
            const requestBody = {email, password}
            console.log(requestBody);
            const response = await axios.post('localhost:5000/api/account/login', requestBody, {
                withCredentials: true,
            })
            if (response.status === 200) {
                navigate('/home');
            }
            // Toast Warning
        } catch (error) {
            console.log(error);
            // Toast Warning unexpected error
        }
    }

    return (
        <div className="form">
            <form action={handleLogin}>
                <h1>Login to your account</h1>
                    <label htmlFor="email">Email Address :</label>
                    <input type="email" name="email" id="email" required/>
                    <label htmlFor="password">Password :</label>
                    <input type="password" name="password" id="password" required/>
                <button>LOG IN</button>
                <p>Don't have an account? <Link to={'/register'}>Create an account</Link></p>
            </form>
        </div>
    )
}

export default Login