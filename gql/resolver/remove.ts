import { UserInputError } from "apollo-server";
import { Arg, Mutation, Resolver } from "type-graphql";
import { Todo, TodoModel } from "../type/todo";
import { RemoveTodoInput } from "../type/input";
import { mongoose } from "@typegoose/typegoose";

Resolver((of) => Todo);
export class RemoveTodoResolver {
        private __Todo = TodoModel;

        @Mutation((returns) => Todo)
        async removeTodo(@Arg("remove") removeTodo: RemoveTodoInput) {
                const { id } = removeTodo;

                if (!id) {
                        new UserInputError('ERROR', {
                                id: mongoose.Types.ObjectId(),
                                message: "Id not provided"
                        })
                }

                const res: any = await this.__Todo.findOne({ _id: id })

                // remove

                const resDelete: any = await this.__Todo.findOneAndDelete({ _id: id })


                if (!resDelete) {
                        new UserInputError('ERROR', {
                                id: mongoose.Types.ObjectId(),
                                message: "Remove failed"
                        })
                }

                return res;
        }
}