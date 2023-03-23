const express = require("express");
const auth = require("../middleware/auth");
const { Task } = require("../models/task");
const router = express.Router();

router.get("/", async (req, res) => {

    let query = {};
    const sort = req.query.order || '-dueDate';
    const taskType = req.query.tasktype || null;

    if(taskType) query.taskType = taskType;

    try {
        let tasks = await Task.find(query).sort(sort);

        res.send(tasks);
    } catch (e) {
        return res.status(400).send(e.message);
    }

});

router.post("/", auth, async (req, res) => {
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    try {
        let task = new Task({
            name: req.body.name,
            description: req.body.description,
            taskType: req.body.taskType,
            dueDate: req.body.dueDate,
            poster: req.body.poster,
            season : req.body.season,
            episode : req.body.episode
        });

        task = await task.save();

        res.send(task);
    } catch (e) {
        return res.status(400).send(e.message);
    }
});

router.delete("/:id", auth, async (req, res) => {
    const task = await Task.findByIdAndRemove(req.params.id);

    if (!task)
        return res.status(404).send("The task with the given ID was not found.");

    res.send(task);
});

module.exports = router;
