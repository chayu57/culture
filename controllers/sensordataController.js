
const SensorData = require("../models/sensordata");


const sensordataHandler = async (req, res, next) => {
  
  const {temperature,humidity, soilMoisture,climateCondition,soilMoistureLevel,voltage,current,waterQuantity,powerConsumption,motorStatus  } = req.body;


  
  

  let exists = false;
  let sensordata;
  try {
    sensordata = await SensorData.find();
    if (sensordata.length == 1) {
      exists = true;
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Updating Data Failed",
    });
  }

  if (exists) {
    const result = await SensorData.findOneAndUpdate(
      { _id: sensordata[0]._id },
      {
        temperature: temperature,
        humidity: humidity,
        soilMoisture: soilMoisture,
        climateCondition: climateCondition,
        soilMoistureLevel: soilMoistureLevel,
        voltage: voltage,
        current: current,
        waterQuantity: waterQuantity,
        powerConsumption:  powerConsumption,
        motorStatus: motorStatus,
      }
    );
  } else {
    try {
      const newSensorData = new SensorData({
        temperature: temperature,
        humidity: humidity,
        soilMoisture: soilMoisture,
        climateCondition: climateCondition,
        soilMoistureLevel: soilMoistureLevel,
        voltage: voltage,
        current: current,
        waterQuantity: waterQuantity,
        powerConsumption:  powerConsumption,
        motorStatus: motorStatus,



      });
      await newSensorData.save();
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Updating Data Failed",
      });
    }
  }

  return res.status(200).json({
    message: "Data updated successfully",
  });
};

const addHours = (numOfHours, date = new Date()) => {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date;
}

const getdataHandler = async (req, res, next) => {
  let sensordata, updatedAtnew;
  try {
    sensordata = await SensorData.find();
    console.log(sensordata);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Getting Data Failed",
    });
  }
  if (sensordata.length == 1) {
    const updatedAtold = new Date(sensordata[0].updatedAt);
    updatedAtnew = addHours(5.511, updatedAtold);
    
  }

  const data = {
    temperature: sensordata[0].temperature,
    humidity: sensordata[0].humidity,
    soilMoisture: sensordata[0].soilMoisture,
    climateCondition: sensordata[0].climateCondition,
    soilMoistureLevel: sensordata[0].soilMoistureLevel,
    voltage: sensordata[0].voltage,
    current: sensordata[0].current,
    waterQuantity: sensordata[0].waterQuantity,
    powerConsumption: sensordata[0]. powerConsumption,
    motorStatus: sensordata[0].motorStatus,

    
  }
  
  return res.status(200).json(data);
}

exports.sensordataHandler = sensordataHandler;
exports.getdataHandler = getdataHandler;
