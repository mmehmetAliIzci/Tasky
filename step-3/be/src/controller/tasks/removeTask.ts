import { RequestHandler, Request } from "express";
import { collections } from "../../services/database.service";

interface RemoveReqBody {
  name: string;
}

export const removeTask: RequestHandler = async (req: Request<{}, {}, RemoveReqBody>, res) => {
  try {
    const { name } = req.body;

    const query = { name: name };
    const result = await collections.tasks.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send({ message: `Successfully removed task with name ${name}` });
    } else if (!result) {
      res.status(400).send(`Failed to remove task with name ${name}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Task with name ${name} does not exist`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};
