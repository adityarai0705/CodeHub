// imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// requiring routes for client-side
const CLIENT_LEADERBOARD = require( './routes/client-leaderboard');
const CLIENT_EDUCATION = require( './routes/client-education');
const CLIENT_NOTICE = require( './routes/client-noticeboard');
const CLIENT_VIDEOS = require( './routes/client-videos');


const server = express();
server.use(cors());

server.use( '/leaderboard', CLIENT_LEADERBOARD);
server.use( '/education', CLIENT_EDUCATION);
server.use( '/education/videos', CLIENT_VIDEOS);
server.use( '/noticeboard', CLIENT_NOTICE);

server.listen( 8080, () => {
    console.log( "server started");
})