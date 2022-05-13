import { Subscription } from "rxjs";
import { Product } from "../interfaces/product";
import { Component, OnInit } from "@angular/core";
import { CartService } from "../services/cart.service";
import { ActivatedRoute, Params } from "@angular/router";
import { StyleService } from "../services/style.service";
import { ProductsService } from "../services/products.service";

@Component({
  template: `
    <div class="container">
      <h2 class="display-5 text-center">Product details</h2>
      <div *ngIf="product" class="row g-5">
        <!-- Left col with Image and description -->
        <div class="col-6">
          <div class="text-center"><img src="{{ product.url }}" class="img-thumbnail mb-3" alt="..." /></div>
          <p>{{ product.description }}</p>
        </div>
        <!-- Right col with title, price and addToCart button -->
        <div class="col-6">
          <p>
            <!-- Colors changes with product category -->
            <span [ngClass]="bgCat(product)" class="rounded-pill text-white px-2 me-3">{{ product.category | uppercase }}</span>
            <span [ngClass]="textCat(product)">| </span>{{ product.platform | titlecase }}
          </p>
          <h1>{{ product.name }}</h1>
          <p class="h5 mt-2">Price: {{ product.price | currency }}</p>
          <button (click)="cartProduct(product)" type="button" class="btn btn-danger form-control mt-5">Add to cart</button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ProdDetailPage implements OnInit {
  product!: Product | undefined;
  sub!: Subscription;

  constructor(private router: ActivatedRoute, private productsSrv: ProductsService, private cartSrv: CartService, private styleSrv: StyleService) {}

  /**
   * Get the specified product by the id in the url
   */
  ngOnInit(): void {
    this.sub = this.router.params.subscribe((params: Params) => {
      const id = +params["id"];
      this.getProduct(id);
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
