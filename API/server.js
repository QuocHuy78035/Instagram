const app = require('./src/app.js');


const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/v1/api/`);
});

process.on("SIGINT", () => {
    server.close(() => {
        console.log("Server closed");
    });
});