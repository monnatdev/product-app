import { Document } from 'mongoose';

export interface IProduct {
    no: number;
    name: string;
    price: number;
    description: string;
    stock: number;
    status: 'active' | 'inactive';
    createDateTime: Date;
    updateDateTime: Date;
}

export interface IProductDocument extends IProduct, Document {}