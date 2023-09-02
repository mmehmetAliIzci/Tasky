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
exports.addAssignee = void 0;
const database_service_1 = require("../../services/database.service");
const addAssignee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, assignees } = req.body;
        if ((assignees === null || assignees === void 0 ? void 0 : assignees.length) < 1) {
            throw new Error("Please specify assignees");
        }
        const task = yield database_service_1.collections.tasks.findOne({ name });
        if (!task) {
            throw new Error("This task doesnt exists");
        }
        // desctructring to remove duplicates
        const newAssignees = [...task.assignees, ...assignees];
        const query = { name };
        // $set adds or updates all fields
        const result = yield database_service_1.collections.tasks.updateOne(query, { $set: { assignees: newAssignees } });
        result
            ? res.status(200).send({
                message: `Successfully updated a new task with name ${name}`,
                task: task,
            })
            : res.status(304).send(`Task with name: ${name} not updated`);
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
exports.addAssignee = addAssignee;
//# sourceMappingURL=addAssignee.js.map