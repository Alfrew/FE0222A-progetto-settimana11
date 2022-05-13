import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminPage } from "./pages/admin.page";
import { ChartPage } from "./pages/chart.page";
import { LoginPage } from "./pages/login.page";
import { NotFoundPage } from "./pages/not-found.page";
import { ProdDetailPage } from "./pages/prod-detail.page";
import { ProductsPage } from "./pages/products.page";

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
    component: ChartPage,
  },
  {
    path: "admin",
    component: AdminPage,
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
