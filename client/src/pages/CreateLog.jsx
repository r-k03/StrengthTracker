import React from 'react'
import {ArrowLeft} from 'lucide-react'
import {Link} from 'react-router'

const CreateLog = ({date}) => {

  console.log(`${date}`);

  function onCreateLog(formData) {
    return;
  }

  return (
    <>
    <div style={{padding: "1rem", alignItems: "center", display:"flex"}}>
      <Link to="/login">
        <ArrowLeft size="50"/>
      </Link>
      <span style={{transform: "translateY(-3.5px)"}}>Back To Home Page</span>
    </div>
     <div className="createLog">
            <div>
                <h1>Add Workout Log</h1>
            </div>

            <form action={onCreateLog}>
                {/* Labels and inputs for form data */}
                <label>Exercise</label>
                <input type="text" name="exerciese" required/>

                <label>Sets</label>
                <input type="number" name="sets"/>

                <label>Reps</label>
                <input type="number" name="reps"/>

                <label>Comments</label>
                <textarea required></textarea>

                <button>Add Log</button>
            </form>
      </div>
    </>
  )
}

export default CreateLog