import React from 'react'

const HomePage = () => {
  return (
    <div className="form">
            <div>
                <h1>Add Workout Log</h1>
            </div>

            <form onSubmit={handleRegister}>
                {/* Labels and inputs for form data */}
                <label>Email: </label>
                <input type="email" required/>

                <label>Password: </label>
                <input type="password" required/>

                <label>Re-Enter Password: </label>
                <input type="password" name="dupPassword" required/>

                <button>Register</button>
            </form>
            <p>Already have an account?<Link to={'/login'}>Sign in</Link></p>
        </div>
  )
}

export default HomePage