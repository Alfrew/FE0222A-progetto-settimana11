import { Subscription } from "rxjs";
import { Product } from "../interfaces/product";
import { Component, OnInit } from "@angular/core";
import { StyleService } from "../services/style.service";
import { ProductsService } from "../services/products.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  template: `
    <div class="container my-3">
      <h2 class="text-center text-danger">Administrator Page</h2>
      <!-- Spinner loading -->
      <div *ngIf="!products" class="d-flex justify-content-center">
        <div class="spinner-border text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div *ngIf="products">
        <!-- Table -->
        <table class="table my-3">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col" class="text-center">Price</th>
              <th scope="col" class="text-center">Edit</th>
              <th scope="col" class="text-center">Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let product of products; let i = index">
              <td>{{ product.name }}</td>
              <td class="text-center">
                <span [ngClass]="bgCat(product)" class="rounded-pill text-white px-2 me-3">{{ product.price | currency }}</span>
              </td>
              <td class="text-center">
                <i [routerLink]="['/admin', product.id]" class="btn p-0 bi bi-pencil-fill text-warning"></i>
              </td>
              <td class="text-center">
                <i (click)="deleteProd(product.id)" class="btn p-0 bi bi-x-circle-fill text-danger"></i>
              </td>
            </tr>
          </tbody>
        </table>
        <button [routerLink]="['/admin/newProduct']" routerLinkActive="d-none" class="btn btn-success form-control">Add a new Product!</button>
      </div>
    </div>
  `,
  styles: [],
})
export class AdminPage implements OnInit {
  products!: Product[];
  sub!: Subscription;

  constructor(private productsSrv: ProductsService, private styleSrv: StyleService, private fBuild: FormBuilder) {}
  /**
   * Get all the products from the server
   */
  ngOnInit(): void {
    this.sub = this.productsSrv.GetAll().subscribe((data) => (this.products = data));
  }
  /**
   * Delete a product from the server by the id
   * @param id of the product to delete
   */
  deleteProd(id: number) {
    this.productsSrv.Delete(id).subscribe(() => {
      this.products = this.products.filter((product) => product.id !== id);
    });
  }
  /**
   * Styles method for ngClass
   * @param item
   * @returns an object with classes and conditions
   */
  bgCat(item: Product) {
    return this.styleSrv.bgChange(item);
  }
  /**
   * Unsubscribe the subscription when the component is destroyed
   */
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
