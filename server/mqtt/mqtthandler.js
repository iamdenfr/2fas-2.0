const mqtt = require('mqtt');
const Sensor = require('../models/sensor.js');
const config = require('../config/default.json');

function handleIncomingData(data) {
    date = new Date();
  Sensor.create({
    arduino_id: data.arduino_id,
    temperature: data.temperature,
    humidity: data.humidity,
    date: date
  })
    .then(() => {
      console.log(`Sensor data from arduino ${data.arduino_id} inserted into the database`);
    })
    .catch((error) => {
      console.error('Error inserting sensor data into the database:', error);
    });
}

function startMQTT() {
  const mqttClient = mqtt.connect(config.MQTT_BROKER, config.MQTT_OPTIONS);
  console.log('Connecting to MQTT broker:', config.MQTT_BROKER);

  mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');

    mqttClient.subscribe(config.MQTT_TOPIC, (err) => {
      if (err) {
        console.error('Error subscribing to MQTT topic:', err);
      } else {
        console.log('Subscribed to MQTT topic:', config.MQTT_TOPIC);
      }
    });
  });

  mqttClient.on('message', (topic, message) => {
    const data = JSON.parse(message.toString());
    handleIncomingData(data);
  });
}

module.exports = {
  startMQTT
};
