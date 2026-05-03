const socket = new WebSocket(
  "wss://climate-monitor-server-397967553683.us-east1.run.app/",
);

const colorPicker = document.getElementById("dashboardColorPicker");
const colorValue = document.getElementById("selectedColorValue");
const colorSwatch = document.getElementById("selectedColorSwatch");

function handleDashboardColorChange(nextColor) {
  if (colorValue) {
    colorValue.textContent = nextColor.toUpperCase();
  }

  if (colorSwatch) {
    colorSwatch.style.backgroundColor = nextColor;
  }

  console.log("Dashboard color changed:", nextColor);
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
