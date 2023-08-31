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
exports.removeTask = void 0;
const database_service_1 = require("../../services/database.service");
const removeTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const query = { name: name };
        const result = yield database_service_1.collections.tasks.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send({ message: `Successfully removed task with name ${name}` });
        }
        else if (!result) {
            res.status(400).send(`Failed to remove task with name ${name}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`Task with name ${name} does not exist`);
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
exports.removeTask = removeTask;
//# sourceMappingURL=removeTask.js.map