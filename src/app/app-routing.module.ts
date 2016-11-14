import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopsComponent } from "./components/shops/shops.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/analytics',
                pathMatch: 'full'
            },
            {
                path: 'shops',
                component: ShopsComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}