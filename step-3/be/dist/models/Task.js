"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskJsonSchema = void 0;
exports.taskJsonSchema = {
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
//# sourceMappingURL=Task.js.map