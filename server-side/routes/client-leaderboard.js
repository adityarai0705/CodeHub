const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

let router = express.Router();
router.use(bodyParser.json());
router.use(cors());


const userBoardInfo = [
    {
        name : 'Aman Thakur',
        regNo : 'dummyReg1',
        cfID : 'Um_nik',
        _id : '32r2324'
    },
    {
        name : 'Bhanu Singh',
        regNo : 'dummyReg2',
        cfID : 'kartik8800',
        _id : '234f123'
    },
    {
        name : 'Raman Singh',
        regNo : 'dummyReg23',
        cfID : 'tejpratapp468',
        _id : '1234f133'
    },
    {
        name : 'Aman Thakur',
        regNo : 'dummyReg1',
        cfID : 'Um_nik',
        _id : '231r341'
    },
];

router.get("/", async (req, res) => {
    res.json(userBoardInfo);
});

module.exports = router