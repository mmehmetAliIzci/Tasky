import { RequestHandler, Request } from "express";
import { collections } from "../../services/database.service";

interface GetNextAssigneeReqBody {
  name: string;
}

function roundRobin(currentAssignee: string | undefined, assignees: Array<string>) {
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

export const getNextAssignee: RequestHandler = async (req: Request<{}, {}, GetNextAssigneeReqBody>, res) => {
  try {
    const { name } = req.body;

    const task = await collections.tasks.findOne({ name });
    if (!task) {
      throw new Error("This task doesnt exists");
    }
    if (task.assignees?.length < 1) {
      throw new Error("No assignees found");
    }

    let nextAssignee = roundRobin(task.currentAssignee, task.assignees);

    const query = { name };
    // $set adds or updates all fields
    const result = await collections.tasks.updateOne(query, { $set: { currentAssignee: nextAssignee } });

    result
      ? res.status(200).send({
          message: `Successfully updated a new task with name ${name}`,
          assignee: nextAssignee,
        })
      : res.status(304).send(`Task with name: ${name} not updated`);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};
