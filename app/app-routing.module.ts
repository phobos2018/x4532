import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/markets", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "market", loadChildren: "./market/market.module#MarketModule" },
    { path: "balances", loadChildren: "./balances/balances.module#BalancesModule" },
    { path: "markets", loadChildren: "./markets/markets.module#MarketsModule" },
    { path: "orders", loadChildren: "./orders/orders.module#OrdersModule" },
    { path: "settings", loadChildren: "./settings/settings.module#SettingsModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
