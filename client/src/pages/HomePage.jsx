import React from 'react'
import {useState} from 'react'
import {Plus} from 'lucide-react'
import Calendar from 'react-calendar'
import { useNavigate } from 'react-router'
import WorkoutLogItem from './WorkoutLogItem'

const HomePage = ({date, setDate}) => {
  const navigate = useNavigate();
  
  // Sample workout logs data
  const [workoutLogs, setWorkoutLogs] = useState([
    {
      _id: 1,
      exercise: 'Bench Press',
      sets: 3,
      reps: 12,
      comments: 'Felt strong today, increased weight',
      date: '2025-07-15'
    }
  ]);

  const handleDateChange = (date) => {
    setDate(date);
    console.log('Selected date:', date);
  };

  const handleDelete = (logId) => {
    if (window.confirm('Are you sure you want to delete this workout log?')) {
      setWorkoutLogs(workoutLogs.filter(log => log._id !== logId));
    }
  };

  const handleEdit = (logId) => {
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