const mongoose = require('mongoose');

const userLogSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        exercise: {
            type: String,
            required: true,
        },
        sets: {
            type: Number
        },
        reps: {
            type: Number
        },
        comments: {
            type: String,
        },
        date: {
            type: Date,
            default: () => new Date()
        }
    },
    {timestamps: true}
);
userLogSchema.pre('save', function() {
    this.date.setHours(0,0,0,0);
})
userLogSchema.index({userID: 1, exercise: 1, date: 1}, {unique: true});
const UserLog = mongoose.model('UserLog', userLogSchema);

module.exports = UserLog;