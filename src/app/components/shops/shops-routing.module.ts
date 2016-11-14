import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopsComponent } from "./shops.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'shops',
                component: ShopsComponent,
                children: [
                    {
                        path: ''
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ShopsRoutingModule {}