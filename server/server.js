const io = require("socket.io")(3000, {
  cors: { origin: "http://localhost:3001", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("message", (message) => {
    socket.broadcast.emit("recieved-message", message);
    socket.emit("recieved-message-me", message);
  });

  socket.on("adduser", (data) => {
    const { username, roomid } = data;
    console.log(username, roomid);
    socket.join(roomid);
    io.to(roomid).emit("User Joined ", "hiiii");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
