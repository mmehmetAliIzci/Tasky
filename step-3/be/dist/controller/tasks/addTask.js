"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTask = void 0;
const database_service_1 = require("../../services/database.service");
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, assignees } = req.body;
        const task = yield database_service_1.collections.tasks.findOne({ name: name });
        if (task) {
            throw new Error("This task name already exists");
        }
        const newTask = { name, assignees };
        const result = yield database_service_1.collections.tasks.insertOne(newTask);
        result
            ? res.status(201).send({
                message: `Successfully created a new task name: ${name}`,
                task: newTask,
            })
            : res.status(500).send("Failed to create a new task.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
exports.addTask = addTask;
//# sourceMappingURL=addTask.js.map