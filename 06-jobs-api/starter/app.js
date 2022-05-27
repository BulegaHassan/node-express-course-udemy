require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet') // sets various http headers to prevent possible attacks
const cors = require('cors')  // ensures our API is accesible from different domains
const xss = require('xss-clean') // sanitises user input(req.body,req.user,req.params) thus protects from xss atacks
const rateLimiter = require('express-rate-limit') // Limit the amount of requests a user can make


const express = require('express');
const app = express();

// connectDB
const connectDB = require('./db/connect')

const authenticateUser = require('./middleware/authentication')

//routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



app.set('trust proxy', 1) // If you are behind a proxy/load balancer (usually the case with most hosting services, e.g. Heroku, Bluemix, AWS ELB, Nginx etc)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }))
app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss())

// extra packages

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs',authenticateUser, jobsRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
