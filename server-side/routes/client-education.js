const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

let router = express.Router();
router.use(bodyParser.json());
router.use(cors());


const educationCategories = [
    {
        title : 'Editorials',
        _id : 'dummy232234'
    },
    {
        title : 'Dynamic Programming',
        _id : 'dummy232234'
    },
    {
        title : 'Greedy',
        _id : 'dummy232234'
    },
    {
        title : 'Graphs',
        _id : 'dummy232234'
    },
    {
        title : 'Backtracking',
        _id : 'dummy232234'
    },
    {
        title : 'C/C++',
        _id : 'dummy232234'
    },
    {
        title : 'Java',
        _id : 'dummy232234'
    },
    {
        title : 'Game Theory',
        _id : 'dummy232234'
    }
];

router.get("/", async (req, res) => {
    res.json(educationCategories);
});

module.exports = router