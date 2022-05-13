import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navbar",
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/">AlfrewZon</a>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/products" routerLinkActive="active">Products</a>
            </li>
            <li class="nav-item" *ngIf="true">
              <a class="nav-link" routerLink="/chart" routerLinkActive="active">Chart</a>
            </li>
            <li class="nav-item" *ngIf="true">
              <a class="nav-link" routerLink="/admin" routerLinkActive="active">Admin</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/login" routerLinkActive="active">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}