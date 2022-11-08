import express from "express";
import cors from "cors";
import { join } from "path";
import index from "./routers/index";
import registration from "./routers/registration";
import user from "./routers/user";
import verification from "./routers/verification";

const app = express();

app.use(cors());
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(index);
app.use(registration);
app.use("/user", user);
app.use(verification);

const PORT = process.env.PORT || 8080; 
app.listen(PORT, () => console.log("listening on port " + PORT));
