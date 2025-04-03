import { Hono } from "hono";
import { userRoutes } from "./routes/user";
import { blogRoute } from "./routes/blog";
import { cors } from "hono/cors";
import { PrismaClient } from "@prisma/client/edge";

const app = new Hono<{ Bindings: {
    DATABASE_URL: string;
    JWT_CODE: string;
};
Variables: {
    userId: string;
    prisma: any;
}; }>();

app.use("/*", cors())
app.route("/api/v1/user", userRoutes);
app.route("/api/v1/blog", blogRoute);

export default app;
