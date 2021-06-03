import { Field, InputType } from "type-graphql";

@InputType()
export class AddTodoInput {
        @Field()
        text: string;
}

@InputType()
export class CompletedTodoInput {
        @Field()
        id: string;
}


@InputType()
export class UpdateTodoInput {
        @Field()
        id: string;

        @Field()
        text: string;
}

@InputType()
export class TodoInput {
        @Field()
        id: string;
}


@InputType()
export class RemoveTodoInput {
        @Field()
        id: string;
}
