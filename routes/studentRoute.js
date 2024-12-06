const express = require("express");
const router = express.Router();
const Student = require("../module/studentSchema");

router.post("/student", async (req, res) => {
    const user = new Student(req.body);
    try {
        const result = await user.save();
        res.status(200).send(result);
    } catch (e) {
        res.status(404).send(e);
    }
});

router.get("/student", async (req, res) => {
    try {
        let result = await Student.find();
        console.log("student requested");
        res.status(200).send(result);
    }
    catch (e) {
        res.status(404).send(e);
    };
});

router.get("/student/:_id", async (req, res) => {
    try {
        let result = await Student.findById(req.params._id);
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;