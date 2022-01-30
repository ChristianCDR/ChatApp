const express = require("express");
const router = express.Router();
const ctrl= require('../controllers/index');

router.get("/message", ctrl.getMessages);
router.post("/users", ctrl.setDatas); 
router.post("/message", ctrl.setMessages);

module.exports = router; 