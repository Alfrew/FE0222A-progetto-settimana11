import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { ChartPage } from "./pages/chart.page";
import { LoginPage } from "./pages/login.page";
import { AdminPage } from "./pages/admin.page";
import { ReactiveFormsModule } from "@angular/forms";
import { ProductsPage } from "./pages/products.page";
import { NotFoundPage } from "./pages/not-found.page";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { ProdDetailPage } from "./pages/prod-detail.page";
import { NavbarComponent } from "./components/navbar.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  declarations: [ChartPage, LoginPage, ProductsPage, AppComponent, ProdDetailPage, NavbarComponent, AdminPage, NotFoundPage],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
