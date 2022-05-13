import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { Product } from "../interfaces/product";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  url = "http://localhost:4201/products";

  // Get all items from server
  GetAll() {
    return this.http.get<Product[]>(this.url).pipe(
      // error management
      catchError((err) => {
        return throwError(this.errorSwitch(err.status));
      })
    );
  }
  // Get specified item by id from server
  Get(id: number) {
    return this.http.get<Product>(this.url + "/" + id).pipe(
      // error management
      catchError((err) => {
        return throwError(this.errorSwitch(err.status));
      })
    );
  }
  // Post new item to server
  Post(item: Product) {
    return this.http.post<Product>(this.url, item).pipe(
      // error management
      catchError((err) => {
        return throwError(this.errorSwitch(err.status));
      })
    );
  }
  // Put item by id to server
  Put(id: number, item: Product) {
    return this.http.put<Product>(this.url + "/" + id, item).pipe(
      // error management
      catchError((err) => {
        return throwError(this.errorSwitch(err.status));
      })
    );
  }
  // Delete item by id from server
  Delete(id: number) {
    return this.http.delete(this.url + "/" + id).pipe(
      // error management
      catchError((err) => {
        return throwError(this.errorSwitch(err.status));
      })
    );
  }
  // Basic switch error messages
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
