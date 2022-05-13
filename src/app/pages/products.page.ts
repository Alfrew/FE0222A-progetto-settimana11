import { Component, OnInit } from "@angular/core";
import { Product } from "../interfaces/product";
import { ProductsService } from "../services/products.service";

@Component({
  template: `
    <div class="container mt-5">
      <div class="row justify-content-evenly">
        <div class="card col-4 mb-5" style="width: 18rem" *ngFor="let product of products">
          <!-- <img src="{{ product.url }}" class="card-img-top" alt="..." /> -->
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ product.name }}</h5>
            <div class="align-self-end mt-auto mx-auto">
              <!-- <button (click)="delPhoto(photo.id)" type="button" class="btn btn-danger me-3">Delete</button> -->
              <!-- <button (click)="likePhoto(photo.id)" type="button" class="btn btn-success">Like</button> -->
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

  constructor(private productsSrv: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsSrv.GetAll().subscribe((data) => (this.products = data));
  }
}
