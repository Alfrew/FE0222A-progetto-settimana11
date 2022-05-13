import { Component, Input, OnInit } from "@angular/core";
import { Product } from "../interfaces/product";

@Component({
  selector: "app-completed",
  template: `
    <div class="container h-100">
      <div class="border my-3 border-3 border-danger h-100">
        <h2 class="display-4 text-center text-danger my-3">Thank you for your purchase</h2>
        <div class="container">
          <table class="table my-5">
            <thead>
              <tr>
                <th scope="col">Products</th>
                <th scope="col">Download Code</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let product of order">
                <td>{{ product.name }}</td>
                <td>
                  {{ product.code }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class CompletedComponent implements OnInit {
  @Input() order!: Product[];

  constructor() {}

  ngOnInit(): void {}
}
