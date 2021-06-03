import { UserInputError } from "apollo-server";
import { Arg, Resolver, Query } from "type-graphql";
import { Todo, TodoModel } from "../type/todo";
import { TodoInput } from "../type/input";
import { mongoose } from "@typegoose/typegoose";

Resolver((of) => Todo);
export class TodoResolver {
        private __Todo = TodoModel;

        @Query((returns) => Todo)
        async todo(@Arg("todo") todo: TodoInput) {
                const { id } = todo;

                if (!id) {
                        new UserInputError('ERROR', {
                                id: mongoose.Types.ObjectId(),
                                message: "Id not provided"
                        })
                }

                // find

                const res: any = await this.__Todo.findOne({ _id: id })

                return res;
        }
}