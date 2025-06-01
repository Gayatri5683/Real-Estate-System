import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import propertiesRoutes from "./routes/properties.js";


const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/properties', propertiesRoutes);

app.get('/', (req, res) => {
    res.json({message : 'welcome to code shift api'});
})

export default app;