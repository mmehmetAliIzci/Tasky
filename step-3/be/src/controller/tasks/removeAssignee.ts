import { RequestHandler, Request } from "express";
import { collections } from "../../services/database.service";

interface RemoveAssigneeReqBody {
  name: string;
  assignee?: string;
}

export const removeAssignee: RequestHandler = async (req: Request<{}, {}, RemoveAssigneeReqBody>, res) => {
  try {
    const { name, assignee } = req.body;

    if (!assignee) {
      throw new Error("Please specify assignee");
    }
    const task = await collections.tasks.findOne({ name });
    if (!task) {
      throw new Error("This task doesnt exists");
    }

    const isAssigneeExists = task.assignees.includes(assignee);

    if (!isAssigneeExists) {
      throw new Error("This assignee doesnt exists in this task");
    }
    if (task.currentAssignee === assignee) {
      throw new Error("You can't remove an assignee that is currently assigned to this task");
    }

    const newAssignees = [...task.assignees.filter((a) => a !== assignee)];

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
