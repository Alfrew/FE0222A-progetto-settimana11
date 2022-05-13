import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { Product } from "../interfaces/product";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  url = "http://localhost:4201/products";

  /**
   * Get all items from server
   * @returns array of items
   */
  GetAll() {
    return this.http.get<Product[]>(this.url).pipe(
      catchError((err) => {
        return throwError(this.errorSwitch(err.status));
      })
    );
  }
  /**
   * Get specified item by id from server
   * @param id of the item
   * @returns the specified item
   */
  Get(id: number) {
    return this.http.get<Product>(this.url + "/" + id).pipe(
      catchError((err) => {
        return throwError(this.errorSwitch(err.status));
      })
    );
  }
  /**
   * Post new item to server
   * @param item to upload
   * @returns
   */
  Post(item: Product) {
    return this.http.post<Product>(this.url, item).pipe(
      catchError((err) => {
        return throwError(this.errorSwitch(err.status));
      })
    );
  }
  /**
   * Put item by id to server
   * @param id of the item
   * @param item is the updated item
   * @returns
   */
  Put(id: number, item: Product) {
    return this.http.put<Product>(this.url + "/" + id, item).pipe(
      catchError((err) => {
        return throwError(this.errorSwitch(err.status));
      })
    );
  }
  /**
   * Delete item by id from server
   * @param id of the item
   * @returns
   */
  Delete(id: number) {
    return this.http.delete(this.url + "/" + id).pipe(
      catchError((err) => {
        return throwError(this.errorSwitch(err.status));
      })
    );
  }
  /**
   * Basic switch error messages
   * @param status from errors
   * @returns errors message
   */
  private errorSwitch(status: number) {
    let mess = "";
    switch (status) {
      case 404:
        mess = "Resources not found";
        break;
      case 500:
        mess = "Internal Server Error";
        break;
      default:
        mess = "Something went wrong...";
        break;
    }
    return mess;
  }
}
