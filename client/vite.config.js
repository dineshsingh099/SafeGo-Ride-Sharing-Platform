import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/users": {
          target: env.VITE_API_URL || "http://127.0.0.1:8171",
          changeOrigin: true,
          secure: false,
        
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq, req) => {
              if (req.headers.cookie) {
                proxyReq.setHeader("cookie", req.headers.cookie);
              }
            });
          },
        },
      },
    },
  };
});
