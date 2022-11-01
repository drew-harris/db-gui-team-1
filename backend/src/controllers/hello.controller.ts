import prisma from "../utils/prisma.util";

export async function sayHello(req, res) {
  console.log(req.query);

  const movies = await prisma.movie.aggregate;

  return res.json({ test: "Hello " + req.query.name, movieCount: movies });
}
