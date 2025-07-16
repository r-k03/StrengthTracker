import {useState, useEffect} from 'react'
import {Plus} from 'lucide-react'
import Calendar from 'react-calendar'
import axios from 'axios'
import { useNavigate } from 'react-router'
import WorkoutLogItem from './WorkoutLogItem'

const HomePage = ({date, setDate}) => {
  const navigate = useNavigate();
  
  // Sample workout logs data
  const [workoutLogs, setWorkoutLogs] = useState([]);

  useEffect(() => {
      const getLogs = async() => {
        try {
          const response = await axios.get(`http://localhost:5000/api/logs/${date.toISOString()}`, {
            withCredentials: true
          });
          console.log(response);
          setWorkoutLogs(response.data);
        } catch (error) {
          console.error(error);
          if (error.response?.status === 403 || error.response?.status === 401) {
            navigate("/login");
          }
          // toast
        }
      }
      getLogs();
    }, [date]);

  const handleDateChange = (date) => {
    setDate(date);
    console.log('Selected date:', date);
  };

  const handleDelete = async (logId) => {
    if (window.confirm('Are you sure you want to delete this workout log?')) {
      try{
        const response = await axios.delete(`http://localhost:5000/api/logs/${logId}`, {
          withCredentials: true
        });
        setWorkoutLogs(workoutLogs.filter(log => log._id !== logId));
      } catch (error) {
        console.error(error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate("/login");
        }
        // toast
      }
    }
  };

  const handleEdit = (_) => {
    console.log('Editing log');
    // Endpoint to be implemented sometime in the future
  };

  const handleAddNew = () => {
    console.log('Add new workout log');
    // Navigate to create log page or open modal
    navigate("/create")
  };

  return (
    <div className="home-page">
      <div className="home-container">
        
        {/* Left Side - Workout Logs */}
        <div className="workout-logs-section">
          <div className="section-header">
            <h1>Workout Logs</h1>
            <button onClick={handleAddNew} className="add-btn">
              <Plus size={20} />
              Add New Log
            </button>
          </div>

          {/* Column Headers */}
          <div className="column-headers">
            <div className="header-exercise">Exercise</div>
            <div className="header-sets">Sets</div>
            <div className="header-reps">Reps</div>
            <div className="header-comments">Comments</div>
            <div className="header-actions">Actions</div>
          </div>

          {/* Workout Log Items */}
          <div className="workout-logs-list">
            {workoutLogs.length > 0 ? (
              workoutLogs.map(log => (
                <WorkoutLogItem
                  key={log._id}
                  log={log}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="no-logs">
                <p>No workout logs found. Start by adding your first workout!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Calendar */}
        <div className="calendar-section">
          <h2>Select Date</h2>
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="workout-calendar"
          />
          <div className="selected-date-info">
            <p>Selected: {date.toLocaleDateString()}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage