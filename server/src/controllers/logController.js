const UserLog = require('../models/UserLog.js');
const jwt = require('jsonwebtoken');

async function getDailyUserLogs(req, res) {
    console.log("Getting");
    const date = req.params.date;
    const id = req.userID;
    const queryDate = new Date(date);
    queryDate.setHours(0,0,0,0);
    try {
        const logs = await UserLog.find({userID: id, date: queryDate}).sort({createdAt: 1});
        return res.status(200).json(logs);
    } catch (error) {
    return res.status(500).json({message: "Error Fetching Logs"});
    }
}

async function deleteLog(req, res) {
    console.log("Deleting");
    try {
    const deletedLog = await UserLog.findByIdAndDelete(req.params.id);
    return res.status(200).json({message: "Successfully Deleted entry"});
    } catch (error) {
        return res.status(500).json({message: "Error Deleting Log"});
    }
}

async function addLog(req, res) {
    const {id, exercise, sets, reps, comments, date} = req.body;
    const queryDate = new Date(date);
    try {
        const addedLog = await UserLog.create({userID: id, exercise, sets, reps, comments, date: queryDate});
        return res.status(201).json({message: "Log Created"});
    } catch (error) {
        return res.status(500).json({message: "Error Adding Log"});
    }
}

module.exports = {getDailyUserLogs, deleteLog, addLog};