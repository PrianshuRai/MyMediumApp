import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { env } from "hono/adapter";
import { sign } from "hono/jwt";

const userRoutes = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_CODE: string;
	};
	Variables: {
		userId: string;
		prisma: any;
	};
}>();

userRoutes.use("*", async (c, next) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	c.set("prisma", prisma);
	console.log("setting prisma");
	await next();
});

userRoutes.post("/signup", async (c) => {
	// const prisma = new PrismaClient({
	// 	datasourceUrl: c.env?.DATABASE_URL,
	// }).$extends(withAccelerate());
	const prisma = c.get("prisma");

	const body = await c.req.json();
	console.log(`body: ${body}`);

	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password,
				name: body.name,
			},
		});
		console.log(
			`created successfully ${user} fetching JWT Token: ${c.env?.JWT_CODE}`
		);

		const jwtToken = await sign({ id: user.id }, c.env?.JWT_CODE);
		console.log(`generating jwtToken: ${jwtToken}`);
		return c.json({ jwtToken });
	} catch (e) {
		console.log(`error:${e}`);
		c.status(403);
		return c.json({ error: "error while sign up: " + e });
	}
});

userRoutes.post("/signin", async (c) => {
	console.log("inside signin route");
	// const prisma = new PrismaClient({
	// 	datasourceUrl: c.env?.DATABASE_URL,
	// }).$extends(withAccelerate());
	const prisma = c.get("prisma");
	const body = await c.req.json();
	const userCheck = await prisma.user.findFirst({
		where: {
			email: body.email,
			password: body.password,
		},
	});
	
	if (!userCheck) {
		c.status(403);
		return c.text(`Details not found`);
	}
	const jwtToken = await sign({ id: userCheck.id }, c.env?.JWT_CODE);
	c.header("Authorization", `Bearer ${jwtToken}`);
	return c.json({ JWT_CODE: jwtToken });
});

export { userRoutes };
