import { Edit, Trash2 } from 'lucide-react';

// Sample workout log item component
const WorkoutLogItem = ({ log, onEdit, onDelete }) => {
  // Component To Represent a Workout Log
  return (
    <div className="workout-log-item">
      <div className="log-exercise">{log.exercise}</div>
      <div className="log-sets">{log.sets}</div>
      <div className="log-reps">{log.reps}</div>
      <div className="log-comments">{log.comments}</div>
      <div className="log-actions">
        <button onClick={() => onEdit(log._id)} className="action-btn edit-btn">
          <Edit size={16} />
        </button>
        <button onClick={() => onDelete(log._id)} className="action-btn delete-btn">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default WorkoutLogItem;