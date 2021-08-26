const Router = require('express');
const tasks = require('../controllers/task');
const router = new Router();

router.get('/', (req, res) => {
    tasks.getTasks(req, res);
})

router.post('/', (req, res) => {
    tasks.createTask(req, res);
});

router.patch('/:id', (req, res) => {
    tasks.updateTask(req, res);
})

router.delete('/:id', (req, res) => {
    tasks.deleteTask(req, res);
})

module.exports = router;