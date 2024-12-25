import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { checkSchema, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import { productSchema } from './@core/schema/product.schema';
import ProductController from './module/product/product.controller';

const app = express();
const port = 3000;

const dbUri = `mongodb://mongodb:27017/mydatabase`;
// const dbUri = `mongodb://localhost:27017/mydatabase`;

mongoose.connect(dbUri).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB', error);
});

const loggerMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    res.on('finish', () => {
        console.log(`Response Status: ${res.statusCode}`);
    });
    next();
};

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); 
app.use(loggerMiddleware);
app.use(bodyParser.json());

const validateRequest = (schema: any): any => [
    checkSchema(schema),
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const productController = new ProductController();
app.use('/api', productController.router);

app.post('/api/products', validateRequest(productSchema), (req, res) => productController.createProduct(req, res));
app.get('/api/products', (req, res) => productController.getAllProducts(req, res));
app.get('/api/products/:id', (req, res) => productController.getProductById(req, res));
app.put('/api/products/:id', (req, res) => productController.updateProduct(req, res));
app.delete('/api/products/:id', (req, res) => productController.deleteProduct(req, res));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});