import { Subscription } from "rxjs";
import { Product } from "../interfaces/product";
import { Component, OnInit } from "@angular/core";
import { CartService } from "../services/cart.service";
import { StyleService } from "../services/style.service";
import { ProductsService } from "../services/products.service";

@Component({
  template: `
    <div class="container mt-5">
      <div class="row justify-content-evenly">
        <!-- Products cards -->
        <div class="card mb-5" style="width: 18rem" *ngFor="let product of products">
          <img src="{{ product.url }}" class="card-img-top" alt="Cannot reach images database" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">
              <span [ngClass]="textCat(product)">| </span>
              {{ product.platform | titlecase }}
            </p>
            <!-- Details and addCart button -->
            <div class="d-flex mt-auto justify-content-evenly">
              <button class="btn btn-secondary" [routerLink]="['/products', product.id]">Details</button>
              <button (click)="cartProduct(product)" type="button" class="btn btn-danger">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ProductsPage implements OnInit {
  products: Product[] = [];
  sub!: Subscription;

  constructor(private productsSrv: ProductsService, private cartSrv: CartService, private styleSrv: StyleService) {}

  /**
   * Get all products from json server when the component is created
   */
  ngOnInit(): void {
    this.sub = this.productsSrv.GetAll().subscribe((data) => (this.products = data));
  }
  /**
   * Add to cart method
   * @param item product from the array
   */
  cartProduct(item: Product) {
    this.cartSrv.addCart(item);
  }
  /**
   * Styles method for ngClass
   * @param item
   * @returns an object with classes and conditions
   */
  bgCat(item: Product) {
    return this.styleSrv.bgChange(item);
  }
  textCat(item: Product) {
    return this.styleSrv.textChange(item);
  }
  /**
   * Unsubscribe the subscription when the component is destroyed
   */
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
