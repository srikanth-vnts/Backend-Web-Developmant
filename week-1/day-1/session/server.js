const express = require('express');
const app = express();

const connect = require("./configs/db")


   app.listen(2244, async () => {
     await connect();
     console.log("listening on 2244");
   });

