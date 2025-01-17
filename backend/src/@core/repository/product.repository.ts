import moment from 'moment-timezone';
import { Model } from 'mongoose';
import { IProduct, IProductDocument } from '../interfaces/product.interface';
import { ProductModel } from '../models/product.model';

export class ProductRepository {
    private productRepository: Model<IProductDocument>;

    constructor(model: Model<IProductDocument> = ProductModel) {
        this.productRepository = model;
    }

    public async create(product: IProduct) {
        const data = await this.productRepository.create(product);
        return data;
    }

    public async getAll(sortBy: string, sortOrder: 'asc' | 'desc', page: number, limit: number, search: string): Promise<IProductDocument[]> {
        const query = { status: 'active', name: { $regex: search, $options: 'i' } };
        return this.productRepository.find(query)
            .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
    }

    public async getById(id: string): Promise<IProductDocument | null> {
        return this.productRepository.findById(id).exec();
    }

    public async update(id: string, product: IProduct): Promise<IProductDocument | null> {
        product.updateDateTime = moment().utc().toDate();
        return this.productRepository.findByIdAndUpdate(id, product, { new: true }).exec();   
    }

    public async getLastProduct(): Promise<IProductDocument | null> {
        return this.productRepository.findOne().sort({ no: -1 }).exec();
    }
}