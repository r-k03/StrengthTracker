const express = require('express');
const app = express();

const cors = require('cors');
const connectDB = require('./config/connectdb.js');
env = require("dotenv");
const cookieParser = require('cookie-parser');
env.config();

const verifyToken = require('./middleware/JWTVerification.js');
const rateLimiter = require('./middleware/rateLimiter.js');
const accountRouter = require('./routes/accountsRouter.js');
const logRouter = require('./routes/logRouter.js');

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Parsing Middleware
app.use(cookieParser());
app.use(express.json());

// Route-Specific Middleware + Routes
app.use('/api/logs', verifyToken);
app.use(rateLimiter);
app.use('/api/logs',logRouter);
app.use('/api/account', accountRouter);

app.get('/', (req, res) => {
    res.status(200).send("Yello");
});

app.get('/api/verify', verifyToken, (req, res) => {
    return res.status(200).json({message:"User Verified"});
});

connectDB().then(() => {
    app.listen(process.env.PORT, () => console.log(`Listening on Port ${process.env.PORT}`))
});
