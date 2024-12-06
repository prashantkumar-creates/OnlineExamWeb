const express = require("express");
let questionRoute = express.Router();
const question = require("../module/QuestionsSchema");

questionRoute.post("/question", async (req, res) => {
    const user = new question(req.body);
    try {
        const result = await user.save();
        res.status(201).send(result);
    } catch (e) {
        res.status(404).send(e);
    }
});

questionRoute.put("/question", (req, res) => {
    const user = new question(req.body)
    user.update(req.body._id);
});

questionRoute.get("/question", async (req, res) => {
    try {
        let result = await question.find();
        console.log("question requested");
        res.status(200).send(result);
    }
    catch (e) {
        res.status(404).send(e);
    };
});

questionRoute.get("/question/:_id", async (req, res) => {
    try {
        let result = await question.findById(req.params._id);
        console.log("question requested");
        res.status(200).send(result);
    }
    catch (e) {
        res.status(404).send(e);
    };
});

questionRoute.get("/question/email/:email", async (req, res) => {
    try {
        let result = await question.find({ email: req.params.email });
        res.status(200).send(result);
        console.log("question using email requested");
    }
    catch (e) {
        res.status(404).send(e);
    };
});

questionRoute.get("/question/:year/:department", async (req, res) => {
    try {
        console.log(req.params);
        let result = await question.find({ year_sem: req.params.year,department:req.params.department });
        res.status(200).send(result);
    }
    catch (e) {
        res.status(404).send(e);
    };
});

questionRoute.delete("/question/:_id", async (req, res) => {
    try {
        const result = await question.findByIdAndDelete(req.params._id);
        console.log("if", req.params._id);
        if (!req.params._id) {
            res.status(400).send();
        }
        res.send(result);
    } catch (e) {
        res.status(500).send(e);
    };
});

questionRoute.patch("/question/:_id", async (req, res) => {
    try {
        let result = await question.findByIdAndUpdate(req.params._id, req.body);
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = questionRoute;