const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const timerId = setInterval(() => {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send('Notification');
        }
    });
}, 300000);

wss.on('listening', () => {
    console.log('WebSocket server listening on localhost:8080');
});

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

process.on('SIGINT', () => {
    clearInterval(timerId);
    wss.close(() => {
        console.log('WebSocket server stopped');
        process.exit();
    });
});
