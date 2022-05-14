import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import { Product } from "../interfaces/product";
import { ProductsService } from "../services/products.service";

@Component({
  selector: "app-put-form",
  template: `
    <!-- Spinner loading -->
    <div *ngIf="!product && loading" class="mt-5 d-flex justify-content-center">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <!-- Error message -->
    <div class="container mt-5 text-center text-muted" *ngIf="!product && !loading">
      <h3>Product not found</h3>
      <p>Maybe it doesn't exist for now</p>
    </div>

    <div class="container my-5" *ngIf="product">
      <h3>{{ product.name }}</h3>
      <form [formGroup]="putForm">
        <div class="mb-3">
          <label for="name" class="form-label">Product Name</label>
          <input formControlName="name" type="text" class="form-control" id="name" />
        </div>
        <div class="mb-3">
          <label for="url" class="form-label">Product Image Url</label>
          <input formControlName="url" type="text" class="form-control" id="url" />
        </div>
        <div class="mb-3">
          <label for="category" class="form-label">Product Category</label>
          <select formControlName="category" name="category" class="form-control" id="category">
            <option value="Game">Game</option>
            <option value="DLC">DLC</option>
            <option value="Bundle">Bundle</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="platform" class="form-label">Platform</label>
          <input formControlName="platform" type="text" class="form-control" id="platform" />
        </div>
        <div class="mb-3">
          <label for="price" class="form-label">Price</label>
          <input formControlName="price" type="number" class="form-control" id="price" />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea formControlName="description" rows="3" class="form-control" id="description"></textarea>
        </div>
        <div class="mb-3">
          <label for="code" class="form-label">Download Code</label>
          <input formControlName="code" type="text" class="form-control" id="code" />
        </div>
        <button (click)="putProd(product.id, putForm.value)" routerLink="/admin" [disabled]="!putForm.valid" type="button" class="btn btn-danger form-control">
          Put edits
        </button>
      </form>
    </div>
  `,
  styles: [
    `
      input,
      textarea,
      select {
        border-left: 10px solid green;
      }
      input.ng-invalid,
      textarea.ng-invalid,
      select.ng-invalid {
        border-left: 10px solid red;
      }
    `,
  ],
})
export class PutFormComponent implements OnInit {
  loading = true;
  product!: Product;
  putForm!: FormGroup;
  sub!: Subscription;

  constructor(private productsSrv: ProductsService, private fBuild: FormBuilder, private router: ActivatedRoute) {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
  /**
   * Apply the validation to the form
   * Compile the form with the product information after 2 sec
   */
  ngOnInit(): void {
    this.sub = this.router.params.subscribe((params: Params) => {
      const id = +params["id"];
      this.getProduct(id);
    });
    this.putForm = this.fBuild.group({
      name: this.fBuild.control(null, [Validators.required]),
      url: this.fBuild.control(null, [Validators.required]),
      category: this.fBuild.control(null, [Validators.required]),
      platform: this.fBuild.control(null, [Validators.required]),
      price: this.fBuild.control(null, [Validators.required]),
      description: this.fBuild.control(null, [Validators.required]),
      code: this.fBuild.control(null, [Validators.required]),
    });
    setTimeout(() => {
      this.updateForm();
      this.sub = this.putForm.valueChanges.subscribe();
    }, 2000);
  }
  /**
   *Compile the form with the product information
   */
  updateForm() {
    this.putForm.patchValue({
      name: this.product.name,
      url: this.product.url,
      category: this.product.category,
      platform: this.product.platform,
      price: this.product.price,
      description: this.product.description,
      code: this.product.code,
    });
  }
  /**
   * Get specified product from json server
   * @param id
   */
  getProduct(id: number) {
    this.productsSrv.Get(id).subscribe((data) => {
      this.product = data;
    });
  }

  putProd(id: number, item: Product) {
    this.productsSrv.Put(id, item).subscribe();
  }
  /**
   * Unsubscribe the subscription when the component is destroyed
   */
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
