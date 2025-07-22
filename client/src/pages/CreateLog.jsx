import { useEffect } from 'react'
import {ArrowLeft} from 'lucide-react'
import {Link, useNavigate} from 'react-router'
import axios from 'axios'
import toast from 'react-hot-toast'

const CreateLog = ({date}) => {

  console.log(`${date}`);
  const navigate = useNavigate();


 // Hook to validate user's jwt session
  useEffect(() => {
    console.log("verifying");
    const verifyUser = async () => {
      try {
        const _ = await axios.get("http://localhost:5000/api/verify", {
        withCredentials: true
      });
      console.log("user verified");
      } catch {
        toast.error("Unauthorized Access");
      navigate("/login");
      }      
    }
    verifyUser();
  }, []);

  // Function that creates a log entry in the database - Navigate to home after success
  async function onCreateLog(formData) {
    const exercise = formData.get("exercise");
    const sets = parseInt(formData.get("sets")) || 0;
    const reps = parseInt(formData.get("reps")) || 0;
    const comments = formData.get("comments");
    const isoDate = date.toISOString();
    const requestBody = {exercise,sets,reps,comments, date: isoDate}
    try {
      const response = await axios.post("http://localhost:5000/api/logs", requestBody, {
        withCredentials: true
      });
      if (response.status === 201) {
          toast.success("Log Creation Successful");          
        }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 429) {
          toast.error("Slow Down! Too Many Requests");
        } else {
          toast.error("Unexpected Error! Try Again Later");
        }
    }

    navigate("/home");
  }

  // Create Log Form
  return (
    <>
    <div style={{padding: "1rem", alignItems: "center", display:"flex"}}>
      <Link to="/home">
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
                <input type="text" name="exercise" required/>

                <label>Sets</label>
                <input type="number" name="sets"/>

                <label>Reps</label>
                <input type="number" name="reps"/>

                <label>Comments</label>
                <textarea name="comments"></textarea>

                <button>Add Log</button>
            </form>
      </div>
    </>
  )
}

export default CreateLog