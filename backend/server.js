import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

mongoose.connect(MONGOURL)
  .then(() => {
    console.log("DATABASE CONNECTED SUCCESSFULLY.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));


  const UserSchema =new mongoose.Schema({
    Name: String,
    Major: String,
  });

  const UserModel = mongoose.model("TES", UserSchema, "TES")

  app.get("/getUsers", async(req, res)=>{
      const userData = await UserModel.find();
      res.json(userData);
  });


  app.post("/addUser", async (req, res) => {
  const { Name, Major } = req.body;
  try {
    const newUser = new UserModel({ Name, Major: Major || "Unknown" }); // Major optional
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// mongoose.connect("mongodb://localhost:27017/miniapp", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const UserSchema = new mongoose.Schema({ name: String });
// const User = mongoose.model("User", UserSchema);

// app.get("/users", async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });

// app.post("/users", async (req, res) => {
//   const newUser = new User({ name: req.body.name });
//   await newUser.save();
//   res.json(newUser);
// });

//  app.listen(5000, () => console.log("Server running on http://localhost:5000"));
