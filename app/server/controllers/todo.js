const taskModel = require('../models/task');

class Tasks {
    async getTasks(req, res) {
        try {
            const tasks = await taskModel.getTasks();
            res.status(200);
            res.json(tasks);
        } catch {
            res.status(400);
            res.end('Bad request');
        }
    }

    async createTask(req, res) {
        try {
            const options = req.body;
            const newTask = await taskModel.createTask(options);
            res.status(201);
            res.json(newTask);
        } catch {
            res.status(400);
            res.end('Bad request');
        }
    }

    async updateTask(req, res) {
        try {
            const id = req.params.id;
            res.status(200);
            res.json(await taskModel.updateTask(id));
        } catch {
            res.status(400);
            res.end('Bad request');
        }
    }

    async deleteTask(req, res) {
        try {
            const id = req.params.id;
            res.status(taskModel.deleteTask(id));
            res.end();
        } catch {
            res.status(400);
            res.end('Bad request');
        }

    }


}

module.exports = new Tasks();