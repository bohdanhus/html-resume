const model = require('../modelsDb');
class TasksModel {

    getTasks() {
        return model.Browser_tasks.findAll();
    }

    async getTask(id) {
        let task = await model.Browser_tasks.findAll({
            where: { id: id }
        });
        task = JSON.stringify(task);
        task = JSON.parse(task);
        return task;
    }

    createTask(options) {
        const { title, due_date, description } = options;
        return model.Browser_tasks.create({ title, done: false, due_date, description });
    }

    async updateTask(id) {
        const task = await this.getTask(id);
        await model.Browser_tasks.update({ done: !task[0].done }, { where: { id: id } })
        return this.getTask(id);
    }

    deleteTask(id) {
        console.log('aaa')
        model.Browser_tasks.destroy({
            where: {
                id: id
            }
        });
        return 201;
    }

}

module.exports = new TasksModel()