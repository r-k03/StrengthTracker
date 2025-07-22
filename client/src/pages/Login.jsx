import axios from "axios"
import { useNavigate, Link } from "react-router"
import toast from "react-hot-toast";

function Login(){

    const navigate = useNavigate()

    // Send Login Info to Server and Navigate to Home Page on Success
    async function handleLogin(formData){
        try {
            const email = formData.get("email");
            const password = formData.get("password");
            const requestBody = {email, password}
            console.log(requestBody);
            const response = await axios.post('http://localhost:5000/api/account/login', requestBody, {
                withCredentials: true,
            })
            if (response.status === 200) {
                navigate('/home');
            }
        } catch (error) {
            console.log(error);
            if (error.response?.status === 429) {
                toast.error("Slow Down! Too Many Requests");
                return;
            }
            toast.error("Error Logging In! Try Again Later");
        }
    }

    // Login Form
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