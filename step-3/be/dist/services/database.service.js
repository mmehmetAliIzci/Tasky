"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.connectToDatabase = exports.collections = void 0;
const mongoDB = __importStar(require("mongodb"));
const dotenv = __importStar(require("dotenv"));
const Task_1 = require("../models/Task");
const TASK_COLLECTION_NAME = "tasks";
exports.collections = {};
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        // Pulls in the .env file so it can be accessed from process.env. No path as .env is in root, the default location
        dotenv.config();
        // Create a new MongoDB client with the connection string from .env
        const client = yield mongoDB.MongoClient.connect(process.env.DB_CONN_STRING);
        // Connect to the database with the name specified in .env
        const db = client.db(process.env.DB_NAME);
        // Apply schema validation for Task collection
        yield applyValidationToCollection(db, "tasks", Task_1.taskJsonSchema);
        // Connect to the collection with the specific name from .env, found in the database previously specified
        exports.collections.tasks = db.collection(TASK_COLLECTION_NAME);
        // Log a success message to the console
        console.log(`Successfully connected to database: ${db.databaseName} and collections: ${exports.collections.tasks.collectionName}`);
    });
}
exports.connectToDatabase = connectToDatabase;
function applyValidationToCollection(db, collectionName, jsonSchema) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db
            .command({
            collMod: collectionName,
            validator: jsonSchema,
        })
            .catch((error) => __awaiter(this, void 0, void 0, function* () {
            if (error.codeName === "NamespaceNotFound") {
                yield db.createCollection(collectionName, {
                    validator: jsonSchema,
                });
            }
        }));
    });
}
//# sourceMappingURL=database.service.js.map