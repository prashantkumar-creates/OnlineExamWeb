const express = require("express");
const router = express.Router();
const Answer = require("../module/AnswerSchema");

router.post("/answer", async (req, res) => {
    const useranswer = new Answer(req.body);
    try {
        const result = await useranswer.save();
        res.status(200).send(result);
    } catch (e) {
        res.status(404).send(e);
    }
});

router.get("/answer", async (req, res) => {
    try {
        let result = await Answer.find();
        console.log("answer requested");
        res.status(200).send(result);
    }
    catch (e) {
        res.status(404).send(e);
    };
});

router.get("/answer/:_id", async (req, res) => {
    try {
        let result = await Answer.findById(req.params._id);
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.delete("/answer/:_id", async (req, res) => {
    try {
        let result = await Answer.findByIdAndDelete(req.params._id);
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get("/answer/findByMail/:email",async (req,res) => {
    try {
        let result = await Answer.find({"email":req.params.email});
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get("/studentAnswerByMail/:email",async (req,res) => {
    try {
        let result = await Answer.find({"email":req.params.email});
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get("/answer/findByQid/:qid",async (req,res) => {
    try {
        let result = await Answer.find({"questionId":req.params.qid});
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;