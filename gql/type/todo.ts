import { Field, ID, ObjectType } from "type-graphql";
import { getModelForClass, prop as Property } from "@typegoose/typegoose";

@ObjectType()
export class Todo {
        @Field((type) => ID)
        readonly _id!: string;

        @Property()
        @Field()
        text: string;

        @Property()
        @Field()
        completed: boolean;

        @Property()
        @Field()
        createdAt: string;

        @Property()
        @Field()
        updatedAt: string;
}

export const TodoModel = getModelForClass(Todo);
