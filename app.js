const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const morgan = require("morgan");
const { PORT, NODE_ENV } = require("./app.config");
const errorMiddleware = require("./middleware/errorMiddleware");
const { connectDB } = require("./database");
const { ws_manager } = require("./routes/ws");
const User = require("./database/models/User");
const { checkAuth } = require("./middleware/auth");
const { v1_router, v2_router } = require("./routes/http");
const { initVault } = require("./services/vault.service");
const { getLocalIpAddresses, getLocalServerIp } = require("./utils/helpers");

const app = express();
const httpApp = http.createServer(app);

const io = new Server(httpApp, {
    cors: {
        origin: "*",
    },
    path: "",
});

global.io = io;

// SERVER
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api/v1", [checkAuth, v1_router]);
app.use("/api/v2", [checkAuth, v2_router]);

// API Documentation
app.get("/api/doc", async (req, res) => {
    res.sendFile(require("path").join(__dirname, "api_documentation.md"));
});
app.use(errorMiddleware);

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    // console.log(`Shutting down the server due to Uncaught Exception`);
    // process.exit(1);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    // console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    // server.close(() => {
    //     process.exit(1);
    // });
});
const StartServer = () => {
    httpApp.listen(PORT, () => {
        console.log(
            `⚡ Server ::  running on PORT:${PORT} in ${NODE_ENV} mode`
        );
    });
    ws_manager(io);
    initVault();
};

connectDB()
    .then(() => {
        StartServer();
    })
    .catch((err) => {
        console.log(
            `App couldn't start cause of DATABASE initialization failure ~~~ !`
        );
    });
