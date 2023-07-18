import express from "express";
import mysql2 from "mysql2";
import cors from "cors";

import bcrypt from "bcrypt";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

import multer from "multer";
import path from "path";
import fs from "fs";

import dotenv from "dotenv";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
dotenv.config();

const saltRounds = 10;

const app = express();

const dbHost = process.env.HOST;
const dbUser = process.env.USER;
const dbPassword = process.env.PASSWORD;
const dbDatabase = process.env.DATABASE;

/*
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;




const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
})
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: "secret_session_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24
    },
}))


const db = mysql2.createPool({
    connectionLimit: 10,
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbDatabase,
})


/*

const uploadDirectory = "./uploads";
if(!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({storage});


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
}).fields([
    {name: 'choiceImages', maxCount: 100}
])
*/

app.get("/", (req, res) => {

    res.json("Hello, this is the backend");

})


// Sign Up

app.post("/signup", (req, res) => {

    const q = "INSERT INTO users_credentials (`username`, `email`, `password`) VALUES (?)";

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        const values = [
            username,
            email,
            hash,
        ]

        if(err) {
            console.log(err);
        }
    
        db.query(q, [values], (err, data) => {
            if(err) {
                console.log(err);
                return res.status(500).json({ error: "Failed to create account"});
            } 
            return res.json("Account has been created")
        })
    })


})

//login

app.post("/login", (req, res) => {

    const q = "SELECT * FROM users_credentials WHERE username = ?";

    const username = req.body.username;
    const password = req.body.password;

    db.query(q, username, (err, data) => {
        if(err) {
            res.send({err: err});
        }
        if (data.length > 0) {
            bcrypt.compare(password, data[0].password, (err, response) => {
                if(response) {
                    req.session.user = data;
                    console.log(req.session.user);
                    res.send(data);
                } else {
                    res.send({message: "Wrong Username/Password Combination"});
                }
            })
        }  else {
            res.send({message: "User Does Not Exist"});
        }
        
    })
})

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({
            loggedIn: true, 
            user: req.session.user
        })
    } else {
        res.send({loggedIn: false})
    }
})

app.get("/profilegames", (req, res) => {
    const q = `SELECT * FROM game_categories WHERE created_by = ?`;
    const username = req.query.username;

    console.log(username);

    db.query(q, username, (err, data) => {
        if(err) return res.json(err);

        const createdGames = {};
        data.forEach((row, index) => {
            createdGames[index] = {
                id: row.id,
                topic: row.topic,
                description: row.description,
            };
        });
        const formattedData = Object.values(createdGames)
        console.log(formattedData);
    
        return res.json(formattedData);
    })
})




app.get("/gamess", (req, res) => {
    const q = `
      SELECT gc.id, gc.topic, gc.description, gc.created_by, gc_choices.choice
      FROM game_categories AS gc
      LEFT JOIN game_choices AS gc_choices ON gc_choices.category_id = gc.id
    `;
    db.query(q, (err, data) => {
      if (err) return res.json(err);
  
      const categories = {};
      data.forEach((row) => {
        const categoryId = row.id;
        if (!categories[categoryId]) {
          categories[categoryId] = {
            id: categoryId,
            topic: row.topic,
            description: row.description,
            created_by: row.created_by,
            choices: [],
          };
        }
        if (row.choice) {
          categories[categoryId].choices.push(row.choice);
        }
      });
  
      const formattedData = Object.values(categories).map((category) => ({
        ...category, 
        choices: category.choices,
      }));
      console.log(formattedData);
    
      return res.json(formattedData);
    });
  });
  


app.post("/gamess", (req, res) => {



    const q1 = "INSERT INTO game_categories (`topic`, `description`, `created_by`) VALUES (?, ?, ?)";
    const q2 = "INSERT INTO game_choices (`category_id`, `choice`) VALUES (?, ?)";
    
    //console.log(req.body.description);
    const topic = req.body.topic;
    const description = req.body.description;
    const choices = JSON.parse(req.body.choices);
    const created_by = req.body.username;

    console.log("Received request data:");
    console.log("Topic:", topic);
    console.log("Description:", description);
    console.log("Choices:", choices);
    console.log("Created by:", created_by);

    db.query(q1, [topic, description, created_by], (err, data) => {
        if(err) return res.json(err)

        const categoryId = data.insertId;
    
        choices.forEach((choice, index) => {

            db.query(q2, [categoryId, choice], (err, data) => {
                if(err) console.log(err);
            });
        });
        return res.json("Game has been created");
    })
})


app.listen(5000, () => {
    console.log("Connected to Backend");
})