const socket = new WebSocket(
  "wss://climate-monitor-server-397967553683.us-east1.run.app/",
);

const colorPicker = document.getElementById("dashboardColorPicker");
const colorValue = document.getElementById("selectedColorValue");
const colorSwatch = document.getElementById("selectedColorSwatch");
let pendingColorToSend = null;

function sendSelectedColor(nextColor) {
  const message = JSON.stringify({
    type: "setColor",
    color: nextColor,
  });

  if (socket.readyState === WebSocket.OPEN) {
    socket.send(message);
    console.log("Sent color over WebSocket:", nextColor);
    pendingColorToSend = null;
    return;
  }

  pendingColorToSend = nextColor;
  console.log("Queued color until WebSocket opens:", nextColor);
}

function handleDashboardColorChange(nextColor) {
  if (colorValue) {
    colorValue.textContent = nextColor.toUpperCase();
  }

  if (colorSwatch) {
    colorSwatch.style.backgroundColor = nextColor;
  }

  console.log("Dashboard color changed:", nextColor);
  sendSelectedColor(nextColor);
}

if (colorPicker) {
  handleDashboardColorChange(colorPicker.value);
  colorPicker.addEventListener("input", (event) => {
    handleDashboardColorChange(event.target.value);
  });
}

socket.onopen = () => {
  console.log("WebSocket connected");
  socket.send("Hello from browser");

  if (pendingColorToSend) {
    sendSelectedColor(pendingColorToSend);
  }
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
