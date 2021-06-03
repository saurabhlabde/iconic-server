import { UserInputError } from "apollo-server";
import { Arg, Mutation, Resolver } from "type-graphql";
import { Todo, TodoModel } from "../type/todo";
import { UpdateTodoInput } from "../type/input";
import { mongoose } from "@typegoose/typegoose";

Resolver((of) => Todo);
export class UpdateTodoResolver {
        private __Todo = TodoModel;

        @Mutation((returns) => Todo)
        async updateTodo(@Arg("update") updateTodo: UpdateTodoInput) {
                const { id, text } = updateTodo;

                if (!id) {
                        new UserInputError('ERROR', {
                                id: mongoose.Types.ObjectId(),
                                message: "Id not provided"
                        })
                }

                if (text?.trim() === "") {
                        new UserInputError('ERROR', {
                                id: mongoose.Types.ObjectId(),
                                message: "Text can't  be empty"
                        })
                }

                // update 

                const resUpdate: any = await this.__Todo.updateOne({ _id: id }, {
                        $set: {
                                "text": text,
                                "updatedAt": new Date().toISOString()
                        }
                })

                if (!resUpdate) {
                        new UserInputError('ERROR', {
                                id: mongoose.Types.ObjectId(),
                                message: "Update failed"
                        })
                }

                const res: any = await this.__Todo.findOne({ _id: id })

                return res;
        }
}