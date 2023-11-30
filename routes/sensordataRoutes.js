const express= require('express');

const router=express.Router();


const sensorDataController=require('../controllers/sensordataController');


router.post("/sensordata",sensorDataController.sensordataHandler);

router.get("/sensordata",sensorDataController.getdataHandler);

router.get("/livesensordata",sensorDataController.livedataHandler);


module.exports=router;