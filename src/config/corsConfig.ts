import cors from "cors";

const corsConfig = cors({
  origin: "127.0.0.1:5500",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

export default corsConfig;
