import { Component, OnInit } from "@angular/core";
import { CartService } from "../services/cart.service";

@Component({
  selector: "app-navbar",
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-danger sticky-top">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/"><span class="border px-2 border-2 rounded-pill">Fintendo</span></a>
        <div class="collapse navbar-collapse justify-content-end me-3" id="navbarNav">
          <ul class="navbar-nav">
            <!-- Products page -->
            <li class="nav-item">
              <a class="nav-link d-inline-block mt-2" routerLink="/products" routerLinkActive="active">Products</a>
            </li>
            <!-- Admin page -->
            <li class="nav-item" *ngIf="false">
              <a class="nav-link d-inline-block mt-2" routerLink="/admin" routerLinkActive="active">Admin</a>
            </li>
            <!-- Login -->
            <li class="nav-item">
              <a class="nav-link d-inline-block mt-2" routerLink="/login" routerLinkActive="active">Login</a>
            </li>
            <!-- Cart -->
            <li class="nav-item" *ngIf="true">
              <a class="nav-link" routerLink="/chart" routerLinkActive="active">
                <button class="btn btn-light btn-outline-danger position-relative">
                  <i class="bi bi-cart3"></i>
                  <!-- Cart counter badge -->
                  <span *ngIf="this.total > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">{{ this.total }}</span>
                </button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [],
})
export class NavbarComponent implements OnInit {
  total: number = 0;

  constructor(private cartSrv: CartService) {}
  /**
   * Put the cart counter in listening of change
   */
  ngOnInit(): void {
    this.cartSrv.sub.subscribe((count) => {
      this.total = count;
    });
  }
}
