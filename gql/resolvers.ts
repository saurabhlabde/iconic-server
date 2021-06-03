import { AddTodoResolver } from '../gql/resolver/add'
import { CompletedTodoResolver } from '../gql/resolver/completed'
import { UpdateTodoResolver } from '../gql/resolver/update'
import { TodoResolver } from '../gql/resolver/todo'
import { TodosResolver } from '../gql/resolver/todos'
import { RemoveTodoResolver } from '../gql/resolver/remove'

export const resolvers = [AddTodoResolver, CompletedTodoResolver, UpdateTodoResolver, TodoResolver, TodosResolver, RemoveTodoResolver] as const;
