import { Request, Response, Router } from 'express';
import { ProductService } from './product.service';

class ProductController {
    public router: Router;
    private productService: ProductService;

    constructor() {
        this.router = Router();
        this.productService = new ProductService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // this.router.get('/products', this.getAllProducts.bind(this));
        // this.router.get('/products/:id', this.getProductById.bind(this));
        // this.router.delete('/products/:id', this.deleteProduct.bind(this));
    }

    public async createProduct(req: Request, res: Response) {
        try {
            console.log('yyy')
            const product = await this.productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    }

    public async getAllProducts(req: Request, res: Response) {
        try {
            const sortBy = req.query.sortBy as string || 'no';
            const sortOrder = req.query.sortOrder as 'asc' | 'desc' || 'asc';
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = req.query.search as string || '';
            const products = await this.productService.getAllProducts(sortBy, sortOrder, page, limit, search);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    }

    public async getProductById(req: Request, res: Response) {
        try {
            const product = await this.productService.getProductById(req.params.id);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    }

    public async updateProduct(req: Request, res: Response) {
        try{   
            const product = await this.productService.updateProduct(req.params.id, req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    }

    public async deleteProduct(req: Request, res: Response) {
        try {
            console.log(req.params.id,"req.params.id")
            const product = await this.productService.deleteProduct(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    }
}

export default ProductController;