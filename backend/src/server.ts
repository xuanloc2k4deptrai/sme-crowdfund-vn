import http from "http";
import { Server as IOServer } from "socket.io";
import app from './app';
import config from './config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const PORT = config.port;

// Create HTTP server
const server = http.createServer(app);

// Enhanced error handling
server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.syscall !== 'listen') {
        console.error('Server error:', error);
        throw error;
    }

    const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});

// Simplified Socket.IO setup
const io = new IOServer(server, {
    cors: {
        origin: "*", // Đơn giản hóa CORS cho development
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
    });
    socket.on("error", (error) => {
        console.error("Socket error:", error);
    });
});

// Start server
try {
    // Lắng nghe trên tất cả địa chỉ IP
    server.listen(PORT, () => {
        console.log(`
🚀 Server Status:
- URL:     http://localhost:${PORT}
- Health:  http://localhost:${PORT}/api/health
        `);
    });
} catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
}

// Improved shutdown handling
process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received.');
    await new Promise<void>((resolve) => {
        server.close(() => resolve());
    });
    await prisma.$disconnect();
    console.log('Server gracefully shutdown');
    process.exit(0);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});