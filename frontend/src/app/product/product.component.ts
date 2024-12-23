import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../@Core/model/product.model';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  imports:[ConfirmModalComponent, NgIf],
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  constructor(private router: Router) {}

  @Input() product!: Product;
  @Output() delete = new EventEmitter<string>();

  showModal: boolean = false;

  navigateToEditProduct() {
    this.router.navigate(['/edit-product', this.product._id]);
  }

  onDelete(): void {
    this.showModal = true;
  }

  onConfirmDelete(): void {
    this.delete.emit(this.product._id);
    this.showModal = false;
  }

  onCancelDelete(): void {
    this.showModal = false;
  }
}