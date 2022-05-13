import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "../interfaces/product";
import { CartService } from "../services/cart.service";
import { StyleService } from "../services/style.service";

@Component({
  template: `
    <div class="container" *ngIf="bought.length == 0">
      <h2 class="display-4 text-center text-danger my-3">Your Cart</h2>
      <div *ngIf="cart.length > 0; else empty">
        <table class="table my-5">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Category</th>
              <th scope="col" class="text-center">Price</th>
              <th scope="col" class="text-center">Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let product of cart; let i = index">
              <td>{{ product.name }}</td>
              <td>
                <span [ngClass]="bgCat(product)" class="rounded-pill text-white px-2 me-3">{{ product.category | uppercase }}</span>
              </td>
              <td class="text-center">{{ product.price | currency }}</td>
              <td class="text-center">
                <i (click)="removeProd(i)" class="btn p-0 bi bi-x-circle-fill text-danger"></i>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <th scope="row">Total</th>
            <td></td>
            <td class="text-center">{{ total | currency }}</td>
            <td></td>
          </tfoot>
        </table>
        <button *ngIf="!proceed" (click)="proceed = !proceed" class="btn btn-danger form-control mb-5">Proceed to the order</button>
        <app-form *ngIf="proceed" (emptier)="emptyCart()"></app-form>
      </div>
      <ng-template #empty><h3 class="text-center text-muted my-5 display-6">--- The cart is empty ---</h3></ng-template>
    </div>
    <app-completed *ngIf="bought.length > 0" [order]="bought"></app-completed>
  `,
  styles: [],
})
export class CartPage implements OnInit {
  cart: Product[] = [];
  bought: Product[] = [];
  sub!: Subscription;
  total: number = 0;
  proceed: boolean = false;
  /**
   * Get the cart from the service and calculate the total price of the products
   * @param cartSrv
   * @param styleSrv
   */
  constructor(private cartSrv: CartService, private styleSrv: StyleService) {
    this.cart = this.cartSrv.getCart();
    for (let product of this.cart) {
      this.total += product.price;
    }
  }

  ngOnInit(): void {}
  /**
   * Remove the specified product from the cart
   * @param index of the product
   */
  removeProd(index: number) {
    this.total -= this.cart[index].price;
    this.cartSrv.removeCart(index);
  }
  /**
   * Empty the cart and transfer the bought products details to the completed component
   */
  emptyCart() {
    this.total = 0;
    this.bought = this.cart;
    this.cart = [];
    this.cartSrv.emptyCart();
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
}
