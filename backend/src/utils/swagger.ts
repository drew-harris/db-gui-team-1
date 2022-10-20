import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
//@ts-ignore
import { version } from "../../../package.json";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DB GUI Team 1 Project - Movie Ranker",
      version,
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [`./src/*.ts`, "./src/routes/*.ts", "./src/schemas/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  // route
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log(`API Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
