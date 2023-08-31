import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { Task, taskJsonSchema } from "../models/Task";

const TASK_COLLECTION_NAME = "tasks";

export const collections: { tasks?: mongoDB.Collection<Task> } = {};

export async function connectToDatabase() {
  // Pulls in the .env file so it can be accessed from process.env. No path as .env is in root, the default location
  dotenv.config();

  // Create a new MongoDB client with the connection string from .env
  const client = await mongoDB.MongoClient.connect(process.env.DB_CONN_STRING);

  // Connect to the database with the name specified in .env
  const db = client.db(process.env.DB_NAME);

  // Apply schema validation for Task collection
  await applyValidationToCollection(db, "tasks", taskJsonSchema);

  // Connect to the collection with the specific name from .env, found in the database previously specified
  collections.tasks = db.collection<Task>(TASK_COLLECTION_NAME);

  // Log a success message to the console
  console.log(
    `Successfully connected to database: ${db.databaseName} and collections: ${collections.tasks.collectionName}`,
  );
}

async function applyValidationToCollection(db: mongoDB.Db, collectionName: string, jsonSchema: any) {
  await db
    .command({
      collMod: collectionName,
      validator: jsonSchema,
    })
    .catch(async (error: mongoDB.MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
        await db.createCollection(collectionName, {
          validator: jsonSchema,
        });
      }
    });
}
