import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import { Product } from "../interfaces/product";
import { ProductsService } from "../services/products.service";

@Component({
  template: `
    <div class="container">
      <h2 class="display-5 text-center">Product details</h2>
      <div *ngIf="product" class="row g-5">
        <div class="col-6">
          <div class="text-center"><img src="{{ product.url }}" class="img-thumbnail mb-3" alt="..." /></div>
          <p>{{ product.description }}</p>
        </div>

        <div class="col-6">
          <p>
            <span class="rounded-pill bg-danger text-white px-2 me-3">{{ product.category | uppercase }}</span>
            <span class="text-danger">| </span>{{ product.platform | titlecase }}
          </p>
          <h1>{{ product.name }}</h1>
          <p class="h5 mt-2">Price: &euro; {{ product.price }}</p>
          <button type="button" class="btn btn-danger form-control mt-5">Add to cart</button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ProdDetailPage implements OnInit {
  product!: Product | undefined;
  sub!: Subscription;

  constructor(private router: ActivatedRoute, private productsSrv: ProductsService) {}

  ngOnInit(): void {
    this.sub = this.router.params.subscribe((params: Params) => {
      const id = +params["id"];
      this.getPost(id);
    });
  }

  getPost(id: number) {
    this.productsSrv.Get(id).subscribe((data) => {
      this.product = data;
    });
  }
}
