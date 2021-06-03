import * as dotenv from "dotenv";
import "reflect-metadata";
dotenv.config();

import { buildSchema } from "type-graphql";
import mongoose from "mongoose";
import { ApolloServer, } from "apollo-server";

// modules
import { resolvers } from "./gql/resolvers";

// config
const PORT = process.env.PORT || 5000;

const bootstrap = async () => {
        const schema = await buildSchema({ resolvers });

        const server = new ApolloServer({
                schema,
                playground: true,
                context: ({ req }) => ({ req }),
                tracing: true,
        });

        mongoose
                .connect("mongodb://localhost:27017/iconicTodo", {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        useCreateIndex: true,
                })
                .then(() => {
                        return server.listen({ port: PORT });
                })
                .then((res) => {
                        return console.log("gql server online 🎉");
                });
};

bootstrap()
