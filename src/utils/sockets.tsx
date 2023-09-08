export default (io, socket) => {
  const createdMessage = (msg:string) => {
    socket.broadcast.emit("newIncomingMessage", msg);
  };

  socket.on("createdMessage", createdMessage);
};