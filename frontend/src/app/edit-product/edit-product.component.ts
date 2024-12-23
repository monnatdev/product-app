import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  productId!: string;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]], 
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      stock: ['', [Validators.required, Validators.pattern('^[0-9]+$')]] 
    });

    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.fetchProduct(this.productId);
    });
  }

  fetchProduct(productId: string) {
    this.http.get(`http://localhost:3000/api/products/${productId}`).subscribe({
      next: (response: any) => {
        this.productForm.patchValue(response);
      },
      error: (error) => {
        console.error('Error fetching product', error); 
      }
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const { name, price, stock } = this.productForm.value;
    this.http.put(`http://localhost:3000/api/products/${this.productId}`, { name, price, stock })
      .subscribe({
        next: (response) => {
          console.log('Product edited successfully', response);
          alert('Product edited successfully');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error editing product', error);
          alert('Error editing product');
        }
      });
  }
  goBack() {
    this.router.navigate(['/home']);
  }
}