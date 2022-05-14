import { NgModule } from "@angular/core";
import { CartPage } from "./pages/cart.page";
import { AdminPage } from "./pages/admin.page";
import { LoginPage } from "./pages/login.page";
import { ProductsPage } from "./pages/products.page";
import { NotFoundPage } from "./pages/not-found.page";
import { RouterModule, Routes } from "@angular/router";
import { ProdDetailPage } from "./pages/prod-detail.page";
import { PutFormComponent } from "./components/put-form.component";
import { PostFormComponent } from "./components/post-form.component";

const routes: Routes = [
  {
    path: "products",
    component: ProductsPage,
  },
  {
    path: "products/:id",
    component: ProdDetailPage,
  },
  {
    path: "chart",
    component: CartPage,
  },
  {
    path: "admin",
    component: AdminPage,
  },
  {
    path: "admin/newProduct",
    component: PostFormComponent,
  },
  {
    path: "admin/:id",
    component: PutFormComponent,
  },
  {
    path: "login",
    component: LoginPage,
  },
  {
    path: "",
    redirectTo: "products",
    pathMatch: "full",
  },
  {
    path: "**",
    component: NotFoundPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
