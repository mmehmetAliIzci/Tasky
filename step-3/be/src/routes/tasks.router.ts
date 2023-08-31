import express from "express";
import * as TaskController from "../controller/tasks";

export const tasksRouter = express.Router();

tasksRouter.use(express.json());

tasksRouter.post("/add", TaskController.addTask);
tasksRouter.post("/remove", TaskController.removeTask);
tasksRouter.post("/add-assignee", TaskController.addAssignee);
tasksRouter.post("/remove-assignee", TaskController.removeAssignee);
tasksRouter.post("/next-assignee", TaskController.getNextAssignee);
