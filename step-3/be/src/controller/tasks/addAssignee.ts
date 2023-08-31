import { RequestHandler, Request } from "express";
import { collections } from "../../services/database.service";

interface AddAssigneeReqBody {
  name: string;
  assignees?: Array<string>;
}

export const addAssignee: RequestHandler = async (req: Request<{}, {}, AddAssigneeReqBody>, res) => {
  try {
    const { name, assignees } = req.body;

    if (assignees?.length < 1) {
      throw new Error("Please specify assignees");
    }
    const task = await collections.tasks.findOne({ name });
    if (!task) {
      throw new Error("This task doesnt exists");
    }

    // desctructring to remove duplicates
    const newAssignees = [...task.assignees, ...assignees];

    const query = { name };
    // $set adds or updates all fields
    const result = await collections.tasks.updateOne(query, { $set: { assignees: newAssignees } });

    result
      ? res.status(200).send({
          message: `Successfully updated a new task with name ${name}`,
          task: task,
        })
      : res.status(304).send(`Task with name: ${name} not updated`);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};
