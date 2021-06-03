import { UserInputError } from "apollo-server";
import { Arg, Mutation, Resolver } from "type-graphql";
import { Todo, TodoModel } from "../type/todo";
import { CompletedTodoInput } from "../type/input";
import { mongoose } from "@typegoose/typegoose";

Resolver((of) => Todo);
export class CompletedTodoResolver {
        private __Todo = TodoModel;

        @Mutation((returns) => Todo)
        async completedTodo(@Arg("completed") completedTodo: CompletedTodoInput) {
                const { id } = completedTodo;

                if (!id) {
                        new UserInputError('ERROR', {
                                id: mongoose.Types.ObjectId(),
                                message: "Id not provided"
                        })
                }

                let resUpdate: any;

                const findCompleted: any = await this.__Todo.findOne({ _id: id })

                if (findCompleted?.completed) {
                        resUpdate = await this.__Todo.updateOne({ _id: id }, {
                                $set: {
                                        "completed": false
                                }
                        })
                } else {
                        resUpdate = await this.__Todo.updateOne({ _id: id }, {
                                $set: {
                                        "completed": true
                                }
                        })
                }

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