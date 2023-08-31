import { RequestHandler, Request } from "express";
import { collections } from "../../services/database.service";

interface AddReqBody {
  name: string;
  assignees?: Array<string>;
}

export const addTask: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  try {
    const { name, assignees } = req.body;

    const task = await collections.tasks.findOne({ name: name });
    if (task) {
      throw new Error("This task name already exists");
    }

    const newTask = { name, assignees };

    const result = await collections.tasks.insertOne(newTask);
    result
      ? res.status(201).send({
          message: `Successfully created a new task name: ${name}`,
          task: newTask,
        })
      : res.status(500).send("Failed to create a new task.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};
