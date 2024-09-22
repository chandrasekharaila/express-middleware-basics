const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const userMiddleware = (req, res, next) => {
  const { username, password } = req.headers;

  if (username != "tarun" || password != "tarun123") {
    res.status(403).send({ error: "Wrong inputs" });
    return;
  }
  next();
};

const studentidmiddleware = (req, res, next) => {
  const { studentId } = req.params;
  if (studentId != "007") {
    res.status(400).send({ error: "student not found" });
    return;
  }
  next();
};

app.get(
  "/marks/:studentId",
  userMiddleware,
  studentidmiddleware,
  (req, res) => {
    const { username } = req.headers;
    const { studentId } = req.params;
    res.send({
      username: username,
      ID: studentId,
      marks: {
        maths: 100,
        phy: 100,
        science: 100,
      },
    });
  }
);

app.listen(port, () => {
  console.log(`server is live at ${port}`);
});
