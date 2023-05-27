require('dotenv').config();
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser =require('body-parser')
const mongoose = require('mongoose');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);
//router
const caseRouter = require('./routers/caseRoute')
const ReAndLogRouter = require('./routers/LoginAndRegister')
const userRouter = require('./routers/userRouter')
const LoginAuth = require('./routers/login')




const port = process.env.PORT || 3001
const mongoAtlas = process.env.DATABASE



// เชื่อมต่อ MongoDB
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false
}).then(() =>console.log('เชื่อมต่อฐานข้อมูลเรียบร้อย'))
.catch((err) => console.log('เกิดข้อผิดพลาด'+err))


// //  เชื่อมต่อ socket
// io.on('connection', (socket) => {
//     console.log('A user connected');
  
//     socket.on('chat message', (message) => {
//       console.log('Received message:', message);
//       io.emit('chat message', message); // ส่งข้อมูล message ให้กับทุกคนที่เชื่อมต่อ
//     });
  
//     socket.on('disconnect', () => {
//       console.log('A user disconnected');
//     });
//   });
  

//app.use(bodyParser.json({limit: "20mb"}))
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());




app.use('/api' , caseRouter)
app.use('/api' , ReAndLogRouter)
app.use('/api' , userRouter)
app.use('/api' , LoginAuth)







app.listen(port , ()=> console.log(`Server is running MY port ${port} 🚀`));









