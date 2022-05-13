import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Product } from "../interfaces/product";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cart: Product[] = [];
  sub = new Subject<number>();

  constructor() {}
  /**
   * Add a product in the cart
   * @param item to add in the cart
   */
  addCart(item: Product) {
    this.cart.push(item);
    this.nextCount();
  }
  /**
   * Remove an Item from the cart by the index
   * @param index of the item
   */
  removeCart(index: number) {
    this.cart.splice(index, 1);
    this.nextCount();
  }
  /**
   * Empty the Cart
   */
  emptyCart() {
    this.cart = [];
    this.nextCount();
  }
  /**
   *
   * @returns the cart
   */
  getCart() {
    return this.cart;
  }
  /**
   * Upload the subject
   */
  nextCount() {
    this.sub.next(this.cart.length);
  }
}
