var express = require("express");
var fileupload = require("express-fileupload");
var path = require("path");
var mysql2 = require("mysql2");
var app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());

const config = {
    host: "127.0.0.1",
    user: "root",
    password: "13131313",
    database: "second",
    dateStrings: true,
};

var mysqldb = mysql2.createConnection(config);

mysqldb.connect(function (err) {
    if (err) {
        console.error("Database connection failed: " + err.message);
    } else {
        console.log("Connected to database successfully");
    }
});

app.listen(2024, function () {
    console.log("Server started on port 2024");
});

app.get("/hello", function (request, response) {
    response.send("Hi bhai");
});

app.get("/h", function (request, response) {
    var filepath = path.join(__dirname, "public", "dashh_citizen.html");
    response.sendFile(filepath);
});

app.get("/ho", function (request, response) {
    var filepath = path.join(__dirname, "public", "indexx.html");
    response.sendFile(filepath);
});

app.get("/hoe", function (request, response) {
    var filepath = path.join(__dirname, "public", "dash_caretaker.html");
    response.sendFile(filepath);
});

app.post("/do-save", function (request, response) {
    console.log(request.body);
    var filename = "nopic.jpg";
    if (request.files && request.files.ppic) {
        filename = request.body.email + "-" + request.files.ppic.name;
        var filepath = path.join(__dirname, "public", "uploads", filename);
        request.files.ppic.mv(filepath, function (err) {
            if (err) {
                console.error("File upload failed: " + err.message);
                return response.status(500).send(err.message);
            }
        });
    }

    var { email, name, address, state, city, mobile } = request.body;

    mysqldb.query(
        "INSERT INTO ccprofile (email, name, address, state, city, mobile, picpath) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [email, name, address, state, city, mobile, filename],
        function (err) {
            if (err) {
                console.error("Database query failed: " + err.message);
                return response.status(500).send(err.message);
            }
            response.send("Data saved");
        }
    );
});

app.get("/do-signup", function (request, response) {
    console.log("sign-in");
    var { email, pwd, t: cb } = request.query;
    mysqldb.query(
        "INSERT INTO si (email, pssword, combo) VALUES (?, ?, ?)",
        [email, pwd, cb],
        function (err) {
            if (err) {
                console.error("Database query failed: " + err.message);
                return response.status(500).send(err.message);
            }
            response.send("Data saved");
        }
    );
});

app.post("/do-update", function (request, response) {
    console.log(request.body);
    var filename = "nopic.jpg";
    if (request.files && request.files.ppic) {
        filename = request.body.email + "-" + request.files.ppic.name;
        var filepath = path.join(__dirname, "public", "uploads", filename);
        request.files.ppic.mv(filepath, function (err) {
            if (err) {
                console.error("File upload failed: " + err.message);
                return response.status(500).send(err.message);
            }
        });
    }

    var { email, name, address, state, city, mobile } = request.body;

    mysqldb.query(
        "UPDATE ccprofile SET namee=?, address=?, state=?, city=?, mobile=?, picpath=? WHERE emailid=?",
        [name, address, state, city, mobile, filename, email],
        function (err, result) {
            if (err) {
                console.error("Database query failed: " + err.message);
                return response.status(500).send(err.message);
            }
            if (result.affectedRows === 1) {
                response.send("Data updated");
            } else {
                response.send("No rows affected");
            }
        }
    );
});

app.post("/savee", function (request, response) {
    console.log(request.body);
    var { email, combo, date, other } = request.body;

    mysqldb.query(
        "INSERT INTO postreq (email, combo, date, other) VALUES (?, ?, ?, ?)",
        [email, combo, date, other],
        function (err) {
            if (err) {
                console.error("Database query failed: " + err.message);
                return response.status(500).send(err.message);
            }
            response.send("Data saved");
        }
    );
});

app.get("/do-login", function (request, response) {
    console.log(request.query);
    var { email, pwd } = request.query;
    mysqldb.query(
        "SELECT combo FROM si WHERE emailid=? AND pssword=?",
        [email, pwd],
        function (err, results) {
            if (err) {
                console.error("Database query failed: " + err.message);
                return response.status(500).send(err.message);
            }
            if (results.length > 0) {
                response.send("Login successful");
            } else {
                response.send("Invalid credentials");
            }
        }
    );
});

app.post("/do-change", function (request, response) {
    var { txtemail: emailid, txtpwd: opwd, txtpwd1: npwd, txtpwd2: cpwd } = request.body;
    if (npwd === cpwd) {
        mysqldb.query(
            "UPDATE si SET pssword=? WHERE emailid=? AND pssword=?",
            [npwd, emailid, opwd],
            function (err, result) {
                if (err) {
                    console.error("Database query failed: " + err.message);
                    return response.status(500).send(err.message);
                }
                if (result.affectedRows === 1) {
                    response.send("Password changed");
                } else {
                    response.send("Invalid email or password");
                }
            }
        );
    } else {
        response.send("Passwords do not match");
    }
});

app.all("/get-user-json1", function (request, response) {
    var { email } = request.query;
    mysqldb.query(
        "SELECT * FROM ccprofile WHERE emailid=?",
        [email],
        function (err, result) {
            if (err) {
                console.error("Database query failed: " + err.message);
                return response.status(500).send(err.message);
            }
            response.send(result);
        }
    );
});

app.post("/do-send", function (request, response) {
    console.log(request.body);
    var filename = "nopic.jpg";
    if (request.files && request.files.ppic) {
        filename = request.body.email + "-" + request.files.ppic.name;
        var filepath = path.join(__dirname, "public", "uploads", filename);
        request.files.ppic.mv(filepath, function (err) {
            if (err) {
                console.error("File upload failed: " + err.message);
                return response.status(500).send(err.message);
            }
        });
    }

    var { email, name, contact, address, city, firm, since, pets } = request.body;

    mysqldb.query(
        "INSERT INTO takerprofile (email, name, contact, address, city, firm, since, pets, proofpic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [email, name, contact, address, city, firm, since, pets, filename],
        function (err) {
            if (err) {
                console.error("Database query failed: " + err.message);
                return response.status(500).send(err.message);
            }
            response.send("Data saved");
        }
    );
});

app.post("/do-modify", function (request, response) {
    console.log(request.body);
    var filename = "nopic.jpg";
    if (request.files && request.files.ppic) {
        filename = request.body.email + "-" + request.files.ppic.name;
        var filepath = path.join(__dirname, "public", "uploads", filename);
        request.files.ppic.mv(filepath, function (err) {
            if (err) {
                console.error("File upload failed: " + err.message);
                return response.status(500).send(err.message);
            }
        });
    }

    var { email, name, contact, address, city, firm, since, pets } = request.body;

    mysqldb.query(
        "UPDATE takerprofile SET name=?, contact=?, address=?, city=?, firm=?, since=?, pets=?, proofpic=? WHERE emailid=?",
        [name, contact, address, city, firm, since, pets, filename, email],
        function (err, result) {
            if (err) {
                console.error("Database query failed: " + err.message);
                return response.status(500).send(err.message);
            }
            if (result.affectedRows === 1) {
                response.send("Data updated");
            } else {
                response.send("No rows affected");
            }
        }
    );
});

app.all("/fetch-sf", function (request, response) {
    var { nw: email, fc: pets } = request.body;
    mysqldb.query(
        "SELECT * FROM takerprofile WHERE emailid=? AND pets=?",
        [email, pets],
        function (err, result) {
            if (err) {
                console.error("Database query failed: " + err.message);
                return response.status(500).send(err.message);
            }
            response.send(result);
        }
    );
});

app.post("/dosubmit", function (request, response) {
    console.log(request.body);
    var { review } = request.body;

    mysqldb.query(
        "INSERT INTO review (review) VALUES (?)",
        [review],
        function (err) {
            if (err) {
                console.error("Database query failed: " + err.message);
                return response.status(500).send(err.message);
            }
            response.send("Data saved");
        }
    );
});
