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
exports.getNextAssignee = void 0;
const database_service_1 = require("../../services/database.service");
function roundRobin(currentAssignee, assignees) {
    // If the current assignee is not found in the array, return null or some default value
    if (!currentAssignee) {
        return assignees[0];
    }
    // Find the index of the current assignee in the array
    const currentIndex = assignees.indexOf(currentAssignee);
    // If the current assignee is not found in the array, return null or some default value
    if (currentIndex === -1) {
        return null;
    }
    // Find the index of the next assignee. If the current assignee is the last one, start from the beginning
    // Example: [1,2,3] and current is 2 (last one), then 3 % 3 = 0 => start from the beginning
    const nextIndex = (currentIndex + 1) % assignees.length;
    // Return the next assignee
    return assignees[nextIndex];
}
const getNextAssignee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name } = req.body;
        const task = yield database_service_1.collections.tasks.findOne({ name });
        if (!task) {
            throw new Error("This task doesnt exists");
        }
        if (((_a = task.assignees) === null || _a === void 0 ? void 0 : _a.length) < 1) {
            throw new Error("No assignees found");
        }
        let nextAssignee = roundRobin(task.currentAssignee, task.assignees);
        const query = { name };
        // $set adds or updates all fields
        const result = yield database_service_1.collections.tasks.updateOne(query, { $set: { currentAssignee: nextAssignee } });
        result
            ? res.status(200).send({
                message: `Successfully updated a new task with name ${name}`,
                assignee: nextAssignee,
            })
            : res.status(304).send(`Task with name: ${name} not updated`);
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
exports.getNextAssignee = getNextAssignee;
//# sourceMappingURL=getNextAssignee.js.map