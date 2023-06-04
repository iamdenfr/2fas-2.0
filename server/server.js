const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config/default.json');
const mqttHandler = require('./mqtt/mqtthandler.js');
const port = config.port;

const authRoutes = require('./routes/authroutes.js');
const userRoutes = require('./routes/useroutes.js');
const weatherRoutes = require('./routes/weatherroutes.js');
const ow_api = require('./utils/openweatherscheduler.js');

const sequelize = require('./sequelize');

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/weather', weatherRoutes);

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Database tables synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database tables:', error);
  }
};

const start = async () => {
  try {
    await syncDatabase();
    app.listen(port, () => {
      console.log(`Server has been started on port ${port}...`); 
      mqttHandler.startMQTT();
      setInterval( () => {
        ow_api.start()
      }, 1000 * 60 * 2);
    });
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
};

start();
