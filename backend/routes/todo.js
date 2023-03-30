const express = require('express');
const router = express.Router();
const fetchUser = require("../middleWare/fetchUser")
const Todo = require("../models/Todo")
const { body, validationResult } = require('express-validator');

router.get('/fetchalltodos', fetchUser, async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.json(todos)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }
})

router.post('/addtodos', fetchUser, [
    body('title').isLength({ min: 5}),
    body('description').isLength({ min: 8 }),
], async (req, res) => {

    try {
        const { title, description, tag,duedate,priority } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const todo = new Todo({
            title, description, tag,duedate,priority, user: req.user.id
        })
        const savedTodo = await todo.save()

        res.json(savedTodo)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }

})


router.put('/updatetodo/:id', fetchUser, async (req, res) => {
    const { title, description, tag ,duedate,priority} = req.body;
    try {
        const newTodo = {};
        if (title) { newTodo.title = title };
        if (title) { newTodo.description = description };
        if (title) { newTodo.tag = tag };
        if (title) { newTodo.duedate = duedate };
        if (title) { newTodo.priority = priority };


        let todo = await Todo.findById(req.params.id);
        if (!todo) { res.status(400).send("Not Found") }

        if (todo.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        todo = await Todo.findByIdAndUpdate(req.params.id, { $set: newTodo }, { new: true });
        res.json({ note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }
})

router.delete('/deletetodo/:id', fetchUser, async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);
        if (!todo) { res.status(400).send("Not Found") }

        if (todo.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        todo = await Todo.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Deleted Successfully", todo: todo })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }
})
module.exports = router