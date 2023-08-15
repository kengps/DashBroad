require('dotenv').config();
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express();

const http = require('http').createServer(app);




//router
const caseRouter = require('./routers/caseRoute')
const ReAndLogRouter = require('./routers/LoginAndRegister')
const userRouter = require('./routers/userRouter')
const LoginAuth = require('./routers/login')
const currentTime = require('./routers/time');


const { swaggerSpec, swaggerUi } = require('./configs/swagger/swagger');


const port = process.env.PORT || 3000
const mongoAtlas = process.env.DATABASE

//Docker
const { MONGO_IP,MONGO_USER,MONGO_PASSWORD ,MONGO_PORT} = require('./configs/mongo/configs');

databaseDocker=`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

// เชื่อมต่อ MongoDB
mongoose.connect(mongoAtlas, {
    useNewUrlParser: true,
    useUnifiedTopology: false
}).then(() => console.log('เชื่อมต่อฐานข้อมูลเรียบร้อย'))
    .catch((err) => console.log('เกิดข้อผิดพลาด' + err))


    //Get Ip
const IP = require('ip');
const axios = require('axios');
const API_KEY = 'a2526ee543b54eff953197387f67d99d';
const URL = 'https://ipgeolocation.abstractapi.com/v1/?api_key=' + API_KEY;

const sendAPIRequest = async (ipAddress) => {
    const apiResponse = await axios.get(URL + "&ip_address=" + ipAddress);
    return apiResponse.data;
}

app.get('/', async (req, res) => {
  res.send('<h1>Im the Flash!!!</h1>')

})
//swagger
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




app.use('/api', caseRouter)
app.use('/api', ReAndLogRouter)
app.use('/api', userRouter)
app.use('/api', LoginAuth)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));






app.listen(port, () => console.log(`Server is running MY port ${port} 🚀`));









