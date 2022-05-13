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

  addCart(item: Product) {
    this.cart.push(item);
    this.nextCount();
  }

  nextCount() {
    this.sub.next(this.cart.length);
  }
}
