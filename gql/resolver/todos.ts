import { Resolver, Query } from "type-graphql";
import { Todo, TodoModel } from "../type/todo";

Resolver((of) => Todo);
export class TodosResolver {
        private __Todo = TodoModel;

        @Query((returns) => [Todo])
        async todos() {

                // find

                const res: any = await this.__Todo.find({}).sort({ createdAt: -1 })

                return res;
        }
}