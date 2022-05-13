import { NgModule } from "@angular/core";
import { CartPage } from "./pages/cart.page";
import { AppComponent } from "./app.component";
import { LoginPage } from "./pages/login.page";
import { AdminPage } from "./pages/admin.page";
import { ReactiveFormsModule } from "@angular/forms";
import { ProductsPage } from "./pages/products.page";
import { NotFoundPage } from "./pages/not-found.page";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { ProdDetailPage } from "./pages/prod-detail.page";
import { FormComponent } from "./components/form.component";
import { NavbarComponent } from "./components/navbar.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CompletedComponent } from './components/completed.component';

@NgModule({
  declarations: [CartPage, LoginPage, ProductsPage, AppComponent, ProdDetailPage, NavbarComponent, AdminPage, NotFoundPage, FormComponent, CompletedComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
