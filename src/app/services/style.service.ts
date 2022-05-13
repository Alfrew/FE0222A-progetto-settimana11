import { Injectable } from "@angular/core";
import { Product } from "../interfaces/product";

@Injectable({
  providedIn: "root",
})
export class StyleService {
  constructor() {}

  /**
   * Method for backgroundColor change with NgClass and product category
   * @param item
   * @returns an object for NgClass changes
   */
  bgChange(item: Product) {
    return {
      "bg-primary": item.category === "DLC",
      "bg-purple": item.category === "Bundle",
      "bg-danger": item.category === "Game",
    };
  }
  /**
   * Method for textColor change with NgClass and product category
   * @param item
   * @returns an object for NgClass changes
   */
  textChange(item: Product) {
    return {
      "text-primary": item.category === "DLC",
      "text-purple": item.category === "Bundle",
      "text-danger": item.category === "Game",
    };
  }
}
