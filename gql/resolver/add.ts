import { UserInputError } from "apollo-server";
import { Arg, Mutation, Resolver } from "type-graphql";
import { Todo, TodoModel } from "../type/todo";
import { AddTodoInput } from "../type/input";
import { mongoose } from "@typegoose/typegoose";

Resolver((of) => Todo);
export class AddTodoResolver {
        private __Todo = TodoModel;

        @Mutation((returns) => Todo)
        async addTodo(@Arg("add") addTodo: AddTodoInput) {
                const { text } = addTodo;

                if (text?.trim() === "") {
                        new UserInputError("ERROR", {
                                id: mongoose.Types.ObjectId(),
                                message: "Text Can't be empty",
                        });
                }

                // add

                const res: any = await this.__Todo.create({
                        _id: mongoose.Types.ObjectId().toString(),
                        text,
                        completed: false,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                });

                return res;
        }
}
