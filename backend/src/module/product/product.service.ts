import { IProductDocument } from "../../@core/interfaces/product.interface";
import { ProductRepository } from "../../@core/repository/product.repository";
import { Product } from "./product.interface";


export class ProductService {
    private productRepository: ProductRepository;
    constructor() {
        this.productRepository = new ProductRepository();
    }
 
    public async createProduct(data: IProductDocument): Promise<IProductDocument> {
        try {
            const lastProduct = await this.productRepository.getLastProduct();
            data.no = lastProduct ? lastProduct.no + 1 : 1;
            const result = await this.productRepository.create(data);
            return result;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    }

    public async getAllProducts(sortBy: string, sortOrder: 'asc' | 'desc', page: number, limit: number, search: string): Promise<Product[]> {
        try {
            const products = await this.productRepository.getAll(sortBy, sortOrder, page, limit, search);
            return products.map(product => ({
                ...product.toObject(), 
                createDateTime: this.formatDate(product.createDateTime),
                updateDateTime: this.formatDate(product.updateDateTime),
            }));

        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    }

    private formatDate(date: Date | string): string {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false, 
        };
        const a = new Intl.DateTimeFormat('en-GB', options).format(new Date(date)).replace(',', '');
        return a
    }

    public async getProductById(id: string): Promise<IProductDocument | null> {
        try {
            const product = await this.productRepository.getById(id);
            return product;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    }

    public async updateProduct(id: string, data: IProductDocument): Promise<IProductDocument | null> {
        try {
            const product = await this.productRepository.getById(id);
            if (!product) {
                throw new Error('Product not found');
            }
            const updatedProduct = await this.productRepository.update(id, data);
            return updatedProduct;
        }   catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    }

    public async deleteProduct(id: string): Promise<IProductDocument | null> {
        try {
            const product = await this.productRepository.getById(id);
            if (!product) {
                throw new Error('Product not found');
            }
            product.status = 'inactive';
            const updatedProduct = await this.productRepository.update(id, product);
            return updatedProduct;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    }
}
