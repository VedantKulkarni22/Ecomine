const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "RogerVSK@22",
    database: "ecomine"
})

con.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
    } else {
        console.log("Connected to MySQL database!");
    }
});

app.post('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const mobile = req.body.mobile;
    const gender = req.body.gender;

    const q = "INSERT INTO users (name, email, mobile, gender, password) VALUES (?, ?, ?, ?, ?);"
    con.query(q, [name, email, mobile, gender, password], 
        (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send({message: "ENTER CORRECT ASKED DETAILS!"})
            }
        }
    )
})

app.post("/login", (req, res) => {
    const email1 = req.body.email1;
    const password1 = req.body.password1;
    const q = "SELECT * FROM users WHERE email = ? AND password = ?";
    con.query(q, [email1, password1], 
        (err, result) => {
            if(err){
                req.setEncoding({err: err});
            }else{
                if(result.length > 0){
                    res.send(result);
                }else{
                    res.send({message: "WRONG EMAIL OR PASSWORD!"})
                }
            }
        }
    )
})

app.post("/cfsizebasedstored", (req, res) => {
    const { email, carbonFootprint } = req.body;

    // Query to insert or update the carbon footprint for the "cfsizebased" column, keeping other columns NULL
    const query = `
      INSERT INTO ecomine.carbonfootprint (email, cfsizebased, cfcoalminedbased, cfmachinerybased, cftransportbased, totalcf, createdat) 
      VALUES (?, ?, NULL, NULL, NULL, NULL, NOW()) 
      ON DUPLICATE KEY UPDATE 
        cfsizebased = VALUES(cfsizebased),
        createdat = NOW();
    `;

    con.query(query, [email, carbonFootprint], (err, result) => { // Use 'con' instead of 'db'
      if (err) {
        console.error("Error updating carbon footprint:", err);
        return res.status(500).send("Server error");
      }
      return res.status(200).send("Carbon footprint stored/updated successfully");
    });
});

app.post("/cfhistorystored", (req, res) => {
    const { email, calculatedValue, calculationType } = req.body;

    // Query to insert the calculated value into carbon_footprint_history
    const query = `
        INSERT INTO carbon_footprint_history (email, calculated_value, calculation_type)
        VALUES (?, ?, ?);
    `;

    con.query(query, [email, calculatedValue, calculationType], (err, result) => {
        if (err) {
            console.error("Error storing calculated carbon footprint history:", err);
            return res.status(500).send("Server error");
        }
        return res.status(200).send("Carbon footprint history stored successfully");
    });
});

app.get("/cfhistory/:email", (req, res) => {
    const email = req.params.email;
    console.log("Fetching history for email:", email);

    const query = `
        SELECT * FROM carbon_footprint_history WHERE email = ? ORDER BY created_at DESC;
    `;

    con.query(query, [email], (err, results) => {
        if (err) {
            console.error("Error fetching carbon footprint history:", err);
            return res.status(500).send("Server error");
        }
        // console.log("Results fetched:", results);  // Check if results are fetched
        return res.status(200).json(results);
    });
});

app.get("/getUserInfo", (req, res) => {
    const loginStatus = req.query.loginStatus; // Get the email from query params
  
    if (!loginStatus) {
      return res.status(400).send({ message: "Login status (email) not provided" });
    }
  
    const query = "SELECT name, email, mobile, gender, password FROM users WHERE email = ?";
    con.query(query, [loginStatus], (err, result) => {
      if (err) {
        console.error("Error fetching user info:", err);
        return res.status(500).send("Server error");
      }
  
      if (result.length > 0) {
        res.status(200).send(result[0]); // Send the user info
      } else {
        res.status(404).send({ message: "User not found" });
      }
    });
  });
  
  app.put('/updateUserInfo', (req, res) => {
    const { name, email, mobile, gender } = req.body;
  
    const query = `UPDATE users SET name = ?, mobile = ?, gender = ? WHERE email = ?`;
    con.query(query, [name, mobile, gender, email], (err, result) => {
      if (err) {
        console.error("Error updating profile:", err);
        res.status(500).send("Error updating profile");
      } else {
        res.send("Profile updated successfully");
      }
    });
  });
  

app.listen(3001, () => {
    console.log("running backend server");
})