import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalyticsComponent } from './components/analytics/analytics.component';
import { ShopsComponent } from "./components/shops/shops.component";

const routes: Routes = [
    { path: '', redirectTo: '/analytics', pathMatch: 'full'},
    { path: 'analytics', component: AnalyticsComponent },
    { path: 'shops', component: ShopsComponent }
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
    imports: [
        routing
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}