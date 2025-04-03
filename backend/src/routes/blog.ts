import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

const blogRoute = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_CODE: string;
	};
	Variables: {
		userId: string;
		prisma: any;
		userid: string;
	};
}>();

blogRoute.use("*", async (c, next) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	console.log("setting prisma");
	c.set("prisma", prisma);
	console.log("setting prisma in c");
	await next();
});

blogRoute.use("*", async (c, next) => {
	const jwt = c.req.header("Authorization");
	console.log(`got jwt ${jwt}`);
	if (!jwt) {
		console.log("jwt not found");
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const payload = await verify(jwt, c.env?.JWT_CODE);
	if (!payload) {
		console.log(`payload not found`);
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	console.log("payload" + JSON.stringify(payload));
	c.set("userid", String(payload.id));
	await next();
});

blogRoute.post("/create", async (c) => {
	const body = await c.req.json();
	const authid = c.get("userid");

	// const prisma = c.get("prisma");
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const blog = await prisma.post.create({
			data: {
				title: body.title,
				content: body.content,
				authorId: authid,
			},
		});
		console.log(`blogId: ${JSON.stringify(blog)}`);

		return c.json({
			blogId: blog.id,
		});
	} catch (error) {
		console.log(error);
		return c.json({
			err: error,
		});
	}
});

blogRoute.put("/update", async (c) => {
	console.log(`update route`);
	
	const body = await c.req.json();
	const prisma = c.get("prisma");

	try {
		const blog = await prisma.post.update({
			where: {
				id: body.id,
			},
			data: {
				title: body.title,
				content: body.content,
			},
		});
		return c.json({
			blogId: blog.id,
		});
	} catch (error) {
		return c.json({ errmsg: error });
	}
});

blogRoute.get("/bulk", async (c) => {
	console.log(`getting bulk values`);
	const prisma = c.get('prisma');

	try {
		const blog = await prisma.post.findMany({
			select: {
				content:true,
				title:true,
				id:true,
				published:true,
				author: {
					select: {
						name: true
					}
				}
			}
		});
		return c.json({ blog });
	} catch (error) {
		c.status(411);
		return c.json({ msg: error });
	}
});

blogRoute.get("/:id", async (c) => {
	const body = c.req.param("id");
	console.log(`getting blog no: ${body}`);
	const prisma = c.get("prisma");

	try {
		const blog = await prisma.post.findFirst({
			where: {
				id: body,
			},
			select: {
				title: true,
				content: true,
				author: {
					select: {
						name: true
					}
				}
			}
		});
		return c.json({ blog });
	} catch (error) {
		c.status(411);
		return c.json({ msg: `error while finding post ${body}: ${error}` });
	}
});


export { blogRoute };
