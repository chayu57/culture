
const SensorData = require("../models/sensordata");


const sensordataHandler = async (req, res, next) => {
  
  const {temperature,humidity, soilMoisture,climateCondition,soilMoistureLevel,voltage,current,waterQuantity,powerConsumption,motorStatus  } = req.body;

  try {
    const currentDate = new Date();
    const existingData = await SensorData.findOne({
      date: {
        $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
        $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1),
      },
    });

    if (existingData) {
      await SensorData.updateOne(
        { _id: existingData._id },
        {
          temperature,
          humidity,
          soilMoisture,
          climateCondition,
          soilMoistureLevel,
          voltage,
          current,
          waterQuantity,
          powerConsumption,
          motorStatus,
        }
      );
    } else {
      const newSensorData = new SensorData({
        temperature,
        humidity,
        soilMoisture,
        climateCondition,
        soilMoistureLevel,
        voltage,
        current,
        waterQuantity,
        powerConsumption,
        motorStatus,
      });

      await newSensorData.save();
    }

    return res.status(200).json({
      message: "Data stored or updated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Storing or Updating Data Failed",
    });
  }
};



const getdataHandler = async (req, res, next) => {
  try {
    const requestedDate = new Date(req.query.date);
    console.log('Requested Date:', requestedDate.toISOString().split('T')[0]);

    const startDate = new Date(requestedDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const sensordata = await SensorData.find({
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    console.log('Sensor Data:', sensordata);

    if (sensordata.length === 0) {
      return res.status(404).json({
        message: "No data found for the requested date",
      });
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
      powerConsumption: sensordata[0].powerConsumption,
      motorStatus: sensordata[0].motorStatus,
    };

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Getting Data Failed",
    });
  }
};


const livedataHandler = async (req, res, next) => {
  let sensordata;
  try {
    sensordata = await SensorData.find().sort({ createdAt: -1 });
    console.log(sensordata);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Getting Data Failed",
    });
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
exports.livedataHandler = livedataHandler
