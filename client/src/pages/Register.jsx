import axios from 'axios';
import React from 'react'
import { useNavigate, Link } from 'react-router';

const Register = () => {

    const navigate = useNavigate();

    async function handleRegister(event) {
        console.log("submitting");

        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const email = formData.get("email");
        const password = formData.get("password");
        console.log(password);
        console.log(formData.get("dupPassword"));
        if (password !== formData.get("dupPassword")) {
            // toast message
            console.log("returning");
            return;
        }
        const requestBody = {email, password};
        console.log(`Sending registration: ${requestBody}`);
        const response = await axios.post("http://localhost:5000/api/account/register", requestBody, {
            withCredentials: true
        });
        form.reset();
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
                <input type="email" name="email" maxLength="254" required/>

                <label>Password: </label>
                <input type="password" name="password" maxLength="30" required/>

                <label>Re-Enter Password: </label>
                <input type="password" name="dupPassword" maxLength="30" required/>

                <button type="submit">Register</button>
            </form>
            <p>Already have an account?<Link to={'/login'}>Sign in</Link></p>
        </div>
  )
}

export default Register