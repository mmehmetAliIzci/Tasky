package storage

import (
	"context"
	"errors"
	"fmt"
	"log"
	"os"
	"tasky/web-service-gin/service"
	"tasky/web-service-gin/types"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/exp/slices"
)

var Client *mongo.Client
var DbName string
var Collection string = "tasks"

type MongoStorage struct{}

func (s *MongoStorage) InitDB() {
	var err error
	connString := os.Getenv("DB_CONN_STRING")
	DbName = os.Getenv("DB_NAME")

	// Use the SetServerAPIOptions() method to set the Stable API version to 1
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(connString).SetServerAPIOptions(serverAPI)
	// Create a new client and connect to the server
	Client, err = mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}

	// Send a ping to confirm a successful connection
	var result bson.M
	if err := Client.Database(DbName).RunCommand(context.TODO(), bson.D{{Key: "ping", Value: 1}}).Decode(&result); err != nil {
		panic(err)
	}
	fmt.Println("Pinged your deployment. You successfully connected to MongoDB!")
}

func (s *MongoStorage) AddAssignee(taskName string, assignee []string) (*types.Task, error) {
	coll := Client.Database(DbName).Collection(Collection)
	filter := bson.D{{Key: "name", Value: taskName}}

	var taskToBeChanged types.Task
	err := coll.FindOne(context.TODO(), filter).Decode(&taskToBeChanged)
	if err != nil {
		return nil, err
	}
	taskToBeChanged.Assignees = append(taskToBeChanged.Assignees, assignee...)
	update := bson.M{"$set": bson.M{"assignees": taskToBeChanged.Assignees}}
	result, err := coll.UpdateOne(context.TODO(), filter, update)

	if err != nil || result.ModifiedCount != 1 {
		return nil, err
	}
	return &taskToBeChanged, nil
}

func (s *MongoStorage) AddTask(taskName string, assignee []string) (*types.Task, error) {

	coll := Client.Database(DbName).Collection(Collection)

	task := types.Task{Name: taskName, Assignees: assignee}

	result, err := coll.InsertOne(context.TODO(), task)

	fmt.Printf("Inserted document with _id: %v\n", result.InsertedID)

	if err != nil {
		log.Default().Println("error", err.Error())
		return nil, nil
	}

	var insertedTask types.Task
	filter := bson.M{"_id": result.InsertedID}
	err = coll.FindOne(context.TODO(), filter).Decode(&insertedTask)

	if err != nil {
		return nil, err
	}

	return &insertedTask, nil
}

func (s *MongoStorage) RemoveTask(taskName string) error {

	coll := Client.Database(DbName).Collection(Collection)

	filter := bson.D{{Key: "name", Value: taskName}}

	result, err := coll.DeleteOne(context.TODO(), filter)
	if err != nil {
		return err
	}

	if result.DeletedCount != 1 {
		return err
	}
	fmt.Printf("deleted document with name: %v\n", taskName)

	return nil
}

func (s *MongoStorage) RemoveAssignee(taskName string, assigneeName string) (*types.Task, error) {
	coll := Client.Database(DbName).Collection(Collection)
	filter := bson.D{{Key: "name", Value: taskName}}

	var taskToBeChanged types.Task
	err := coll.FindOne(context.TODO(), filter).Decode(&taskToBeChanged)

	if err != nil {
		// no task found
		return nil, err
	}
	assigneeIndex := slices.Index(taskToBeChanged.Assignees, assigneeName)

	if assigneeIndex == -1 {
		// no assignee found
		return nil, errors.New("no assignee found")
	}

	taskToBeChanged.Assignees = append(taskToBeChanged.Assignees[:assigneeIndex], taskToBeChanged.Assignees[assigneeIndex+1:]...)
	update := bson.M{"$set": bson.M{"assignees": taskToBeChanged.Assignees}}
	result, err := coll.UpdateOne(context.TODO(), filter, update)

	if err != nil || result.ModifiedCount != 1 {
		return nil, err
	}

	return &taskToBeChanged, nil
}

func (s *MongoStorage) GetNextAssignee(name string) (string, error) {
	coll := Client.Database(DbName).Collection(Collection)
	filter := bson.D{{Key: "name", Value: name}}

	var taskToBeChanged types.Task
	err := coll.FindOne(context.TODO(), filter).Decode(&taskToBeChanged)

	if err != nil {
		// no task found
		return "", err
	}

	if len(taskToBeChanged.Assignees) == 0 {
		// no assignees found
		return "", err
	}

	nextAssignee := service.RoundTable(taskToBeChanged.CurrentAssignee, taskToBeChanged.Assignees)

	taskToBeChanged.CurrentAssignee = nextAssignee
	update := bson.M{"$set": bson.M{"currentAssignee": taskToBeChanged.CurrentAssignee}}
	result, err := coll.UpdateOne(context.TODO(), filter, update)
	if err != nil || result.ModifiedCount != 1 {
		return "", err
	}

	return taskToBeChanged.CurrentAssignee, nil

}
