window.addEventListener("DOMContentLoaded", () => {
  SwaggerUIBundle({
    url: "../assets/openapi/chasm-master-api.yaml",
    dom_id: "#swagger-ui",
    deepLinking: true,
    displayRequestDuration: true,
    filter: true,
    presets: [SwaggerUIBundle.presets.apis],
    layout: "BaseLayout",
  });
});
