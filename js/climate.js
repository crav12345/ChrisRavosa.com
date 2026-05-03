const socket = new WebSocket(
  "wss://climate-monitor-server-397967553683.us-east1.run.app/",
);

socket.onopen = () => {
  console.log("WebSocket connected");
  socket.send("Hello from browser");
};

socket.onmessage = (event) => {
  console.log("Message from server:", event.data);
};

socket.onclose = () => {
  console.log("WebSocket closed");
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};
