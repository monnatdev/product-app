import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../@Core/model/product.model';
import { ProductComponent } from "../product/product.component";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [ProductComponent, NgFor, NgClass, NgIf]
})
export class HomeComponent {

  products: Product[] = [];
  sortBy: string = 'no';
  sortOrder: 'asc' | 'desc' = 'asc';
  page: number = 1;
  limit: number = 10;

  constructor(private router: Router, private http: HttpClient) {
    this.fetchProducts();
  }

  navigateToAddProduct() {
    this.router.navigate(['/add-product']);
  }

  deleteProduct(productId: string) {
    this.http.delete(`http://localhost:3000/api/products/${productId}`).subscribe({
      next: () => {
        this.fetchProducts(); 
      },
      error: (error) => {
        console.error('Error deleting product', error);
      }
    });
  }
  
  fetchProducts() {
    const params = {
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
      page: this.page.toString(),
      limit: this.limit.toString()
    };
    this.http.get<Product[]>('http://localhost:3000/api/products', { params }).subscribe(
      {
        next: (products) => {
          this.products = products;
        },
        error: (error) => {
          console.error('Error fetching products', error);
        }
      });
  }

  changeSortOrder(sortBy: string) {
    if (this.sortBy === sortBy) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = sortBy;
      this.sortOrder = 'asc';
    }
    this.fetchProducts();
  }

  changePage(page: number) {
    this.page = page;
    this.fetchProducts();
  }
}
