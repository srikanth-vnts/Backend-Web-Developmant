const mongoose = require('mongoose');

const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/web-10-pagination")
}

   module.exports = connect;