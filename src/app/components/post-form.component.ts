import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Product } from "../interfaces/product";
import { ProductsService } from "../services/products.service";

@Component({
  selector: "app-post-form",
  template: `
    <div class="container my-3">
      <h3 class="text-center text-danger display-6">Add a new product</h3>
      <form [formGroup]="postForm">
        <button (click)="generateProd()" type="button" class="btn btn-success form-control">Autocompile</button>
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
        <button (click)="postProd(postForm.value)" routerLink="/admin" [disabled]="!postForm.valid" type="button" class="btn btn-danger form-control">
          Post new product
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
export class PostFormComponent implements OnInit {
  postForm!: FormGroup;
  sub!: Subscription;
  /**
   * Placeholder Product
   */
  product = {
    name: "LEGO® Star Wars™: The Skywalker Saga",
    url: "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_700/v1/ncom/en_US/games/switch/l/lego-star-wars-the-skywalker-saga-switch/hero",
    category: "Game",
    platform: "Nintendo Switch",
    price: 59.99,
    description:
      "The galaxy is yours in LEGO® Star Wars™: The Skywalker Saga. Experience memorable moments and nonstop action from all nine Skywalker saga films reimagined with signature LEGO humor. ",
    code: "S00AX5NDH9HR4JSK",
  };

  constructor(private productsSrv: ProductsService, private fBuild: FormBuilder) {}
  /**
   * Apply the validation to the form
   */
  ngOnInit(): void {
    this.postForm = this.fBuild.group({
      name: this.fBuild.control(null, [Validators.required]),
      url: this.fBuild.control(null, [Validators.required]),
      category: this.fBuild.control(null, [Validators.required]),
      platform: this.fBuild.control(null, [Validators.required]),
      price: this.fBuild.control(null, [Validators.required]),
      description: this.fBuild.control(null, [Validators.required]),
      code: this.fBuild.control(null, [Validators.required]),
    });
    this.sub = this.postForm.valueChanges.subscribe();
  }
  /**
   * Post the product to the server
   * @param item is the product to post
   */
  postProd(item: Product) {
    this.productsSrv.Post(item).subscribe();
  }
  /**
   * Autocompile the Form with the placeholder product
   */
  generateProd() {
    this.postForm.patchValue({
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
   * Unsubscribe the subscription when the component is destroyed
   */
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
