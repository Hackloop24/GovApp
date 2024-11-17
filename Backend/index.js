import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import InfoModel from './models/info.js';
import reportRoutes from './reportRoutes.js';
const app = express();
app.use(express.json());
app.use(cors());
//connecting to db
mongoose.connect("mongodb+srv://prajwalinna1905:mJXlPo4EStDg0GPF@cluster0.hvl16.mongodb.net/information?retryWrites=true&w=majority&appName=Cluster0", {
});
app.post('/login', (req, res) => {
  const { email, password } = req.body;
//finding user with email from db
  InfoModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json({ message: "login successful", user: user });
        } else {
          res.json({ message: "Password Incorrect" });
        }
      } else {
        res.json("No record exists");
      }
    })
    .catch(err => res.json(err));
});

// register route
app.post('/register', (req, res) => {
  InfoModel.create(req.body)
    .then(information => res.json(information))
    .catch(err => res.json(err));
});
app.use('/api/report',reportRoutes);
//these above things will redirect to the server and will run on the port and change if it is busy

app.listen(5003, () => {
  console.log("Server is running on port 5003");
});
