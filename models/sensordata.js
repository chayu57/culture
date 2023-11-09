const mongoose = require("mongoose");

const Schema = mongoose.Schema;


 
const sensordataSchema = new Schema(
    {
      temperature: {
        type: Schema.Types.Number,
        required: true,
      },
      humidity: {
        type: Schema.Types.Number,
        required: true,
      },
      soilMoisture: {
        type: Schema.Types.Number,
        required: true,
      },
      climateCondition: {
        type: Schema.Types.String,
        required: true,
      },
      soilMoistureLevel: {
        type: Schema.Types.Number,
        required: true,
      },
      voltage: {
        type: Schema.Types.Number,
        required: true,
      },
      current: {
        type: Schema.Types.Number,
        required: true,
      },
      waterQuantity: {
        type: Schema.Types.Number,
        required: true,
      },
      powerConsumption: {
        type: Schema.Types.Number,
        required: true,
      },
      motorStatus: {
        type: Schema.Types.String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  

module.exports = mongoose.model("sensordata", sensordataSchema);
