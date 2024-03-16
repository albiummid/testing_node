const mongoose = require("mongoose");
const { database } = require("../app.config");
const { initTerminal } = require("../middleware/terminal");

const connectDB = async () =>
    mongoose
        .connect(database.database_url, {
            retryWrites: true,
        })
        .then(() => {
            initTerminal();
            console.log("⚡ DB Connected");
        })
        .catch((err) => {
            console.log(" 🔥 ERROR__:", err);
        });

module.exports = {
    connectDB,
};
