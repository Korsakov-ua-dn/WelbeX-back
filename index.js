import express from 'express';
import mongoose from 'mongoose';
import router from "./router.js";
import bodyParser from 'body-parser';
import cors from "cors";

const PORT = process.env.PORT || 5000;
const DB_URL = `mongodb+srv://user:user@cluster0.iaj9f.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());

app.use('/api', router);

async function startApp() {
    try {
        await mongoose.connect(DB_URL, { useNewUrlParser: true,  useUnifiedTopology: true })
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp();