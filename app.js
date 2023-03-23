require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const routerBlog = require('./routers/blog')
const routerAuth = require('./routers/auth')
const routerRegister = require('./routers/register')
const routerUsers = require('./routers/users')

const mongoose = require('mongoose');
//connect dataBase
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false
}).then(() =>console.log('เชื่อมต่อฐานข้อมูลเรียบร้อย'))
.catch((err) => console.log('เกิดข้อผิดพลาด'+err))




const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//router
app.use('/api', routerBlog);
app.use("/api", routerAuth);
app.use("/api", routerRegister);
app.use("/api", routerUsers);

app.listen(process.env.PORT , ()=> console.log('Server is running 3001'));

