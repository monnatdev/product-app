import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  imports:[ReactiveFormsModule, NgIf],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]], 
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      stock: ['', [Validators.required, Validators.pattern('^[0-9]+$')]] 
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const { name, price, stock } = this.productForm.value;

    this.http.post('http://localhost:3000/api/products', { name, price, stock })
      .subscribe({
        next: (response) => {
          console.log('Product added successfully', response);
          alert('Product added successfully');
          this.productForm.reset();
        },
        error: (error) => {
          console.error('Error adding product', error);
          alert('Error adding product');
        }
      });
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
