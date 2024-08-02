const socketIO = require('socket.io');

let io; // Global variable to store Socket.IO instance

// Initialize Socket.IO and export the server instance
exports.init = (server) => {
  io = socketIO(server, {cors: {origin: "*"}});
  // Set up Socket.IO event listeners or handlers here
  // For example:
  io.on('connection', (socket) => {
    console.log('A user connected');
    // Handle events from connected clients
    socket.on('event', (data) => {
      console.log('Received event:', data);
    });
    // ...
  });
};

// Export the io instance to be used in routes
exports.getIO = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
};
