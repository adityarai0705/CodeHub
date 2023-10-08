const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

let router = express.Router();
router.use(bodyParser.json());
router.use(cors());


const VideoListsData = [
    {
        title: `Video Editorial for CodeTogether's Quarters 31`,
        date: '24th June 2022',
        ytLink: 'd',
        _id: 'dummy232234'
    },
    {
        title: `Video Editorial for CodeTogether's Quarters 30`,
        date: '22th June 2022',
        ytLink: 'https://www.youtube.com/embed/T2WHvJdx0fs',
        _id: 'dummy232234'
    },
    {
        title: `Video Editorial for CodeTogether's Quarters 29`,
        date: '19th June 2022',
        ytLink: 'https://www.youtube.com/embed/T2WHvJdx0fs',
        _id: 'dummy232234'
    },
    {
        title: `Video Editorial for CodeTogether's Quarters 28`,
        date: '16th June 2022',
        ytLink: 'https://www.youtube.com/embed/T2WHvJdx0fs',
        _id: 'dummy232234'
    },
    {
        title: `Video Editorial for CodeTogether's Quarters 27`,
        date: '15th June 2022',
        ytLink: 'https://www.youtube.com/embed/T2WHvJdx0fs',
        _id: 'dummy232234'
    },
    {
        title: `Video Editorial for CodeTogether's Quarters 26`,
        date: '11th June 2022',
        ytLink: 'https://www.youtube.com/embed/T2WHvJdx0fs',
        _id: 'dummy232234'
    }
];


router.get("/", async (req, res) => {
    res.json( VideoListsData);
});

module.exports = router