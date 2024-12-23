// models/product.model.ts
import { model, Model, Schema } from 'mongoose';
import { IProductDocument } from '../interfaces/product.interface';

const productSchema = new Schema<IProductDocument>({
    no:  { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description:  { type: String, required: false },
    stock:  { type: Number, default: 0 },
    createDateTime: { type: Date, default: Date.now }, 
    updateDateTime: { type: Date, default: Date.now }, 
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});

productSchema.pre('save', async function(next) {
    if (!this.no) {
        const lastProduct = await ProductModel.findOne().sort({ no: -1 });
        this.no = lastProduct ? lastProduct.no + 1 : 1;
    }
    next();
});


export const ProductModel: Model<IProductDocument> = model<IProductDocument>('Product', productSchema);