import { ObjectId } from "mongodb";

export interface Task {
  name: string;
  assignees: Array<string>;
  currentAssignee?: string;
  id?: ObjectId;
}

export const taskJsonSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["name", "assignees", "currentAssignee"],
    additionalProperties: false,
    properties: {
      name: { bsonType: "string" },
      assignees: { bsonType: "array" },
      currentAssignee: { bsonType: "string" },
    },
  },
};
