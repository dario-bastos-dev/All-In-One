import cors from "cors";

const corsConfig = cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

export default corsConfig;
