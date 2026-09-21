// write your Express server here.
const express = require("express"); //This loads the Express package that you installed with npm."
const cors = require("cors"); //This tells Express to allow requests from your frontend.
const mongoose = require("mongoose");
const { Timestamp } = require("mongodb");

//Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        rquired: true
    },

    subject: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    }
},

    {
        timestamps: true

    });

//Model
const Contact = mongoose.model("Contact", contactSchema);

const app = express();  //This creates our Express application.

mongoose.connect("mongodb://localhost:27017/portfolioDB")
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });


app.use(cors()); //adds the appropriate CORS headers to your Express responses, allowing cross-origin requests.


const PORT = 5000;  //This defines the port where our local server will run.

app.use(express.json());


app.get("/", (req, res) => {  //GET is generally used when we want to retrieve/request information.
    res.send("Hello! My backend server is working.");   //"Send this text back to whoever made the request."
});


app.post("/api/contact", async (req, res) => { //Telling Express when somebody sends a POST request to /api/contact, run this function

    try {
        const newContact = new Contact(req.body);  //takes the data coming from your frontend and creates a new document using your Contact model

        await newContact.save();  //saves that document into MongoDB.

        res.status(201).json({
            success: true,
            message: "Contact form data saved successfully!"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to save contact form data."
        });
    }
});

// "Start the server and listen for incoming requests on this port."
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});