import express, { Express, Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const app: Express = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({status:"Running", message:"Welcome to the Rexy Events API!"})
})

app.listen(8080,() => {
    console.log(`Server is running on port ${8080}.`);
});

