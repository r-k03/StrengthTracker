import axios from 'axios';
import React from 'react'
import { useNavigate, Link } from 'react-router';

const Register = () => {

    async function handleRegister(event) {

        const navigate = useNavigate();

        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        if (password !== formData.get("dupPassword")) {
            // toast message
            return;
        }
        const requestBody = {email, password};
        const response = await axios.post("localhost:5000/api/account/register", requestBody, {
            withCredentials: true
        });
        event.reset();
        if (response.status === 201) {
            navigate('/login');
        }


    }

  return (
     <div className="form">
            <div>
                <h1>User Registration</h1>
            </div>

            <form onSubmit={handleRegister}>
                {/* Labels and inputs for form data */}
                <label>Email: </label>
                <input type="email" maxlength="254" required/>

                <label>Password: </label>
                <input type="password" maxlength="30" required/>

                <label>Re-Enter Password: </label>
                <input type="password" name="dupPassword" maxLength="30" required/>

                <button>Register</button>
            </form>
            <p>Already have an account?<Link to={'/login'}>Sign in</Link></p>
        </div>
  )
}

export default Register