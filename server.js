const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3001;
const studentRouter = require("./routes/studentRoute");
const questionRouter = require("./routes/questionsRoute");
const answerRouter = require("./routes/answerRoute");
const question = require("./module/QuestionsSchema");
const Answer = require("./module/AnswerSchema");

app.use(cors());
app.use(express.json());
app.use(studentRouter);
app.use(questionRouter);
app.use(answerRouter);

mongoose.connect(" mongodb://127.0.0.1:27017/student-api",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => {
        console.log("Mongo db connection established");
    }).catch((e) => {
        console.log(e);
    });

// app.get("/teacher/studentAnswer/60d2ebbc9b186320184cc42b/60d73c18e9a38929686ee18c",async (req,res) => {
app.get("/teacher/studentAnswer/:qId/:ansId",async (req,res) => {
    try {
        let result2 = await question.findById(req.params.qId);
        let result = await Answer.findById(req.params.ansId);
        let responce = {
            "Questions":result2,
            "Answers":result,
        }
        res.status(200).send(responce);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.listen(port, () => {
    console.log(`server started ... ${port}`);
});