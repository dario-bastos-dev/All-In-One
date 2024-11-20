import cors from "cors";

const corsConfig = cors({
  origin: "http://127.0.0.1:5500",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

export default corsConfig;
