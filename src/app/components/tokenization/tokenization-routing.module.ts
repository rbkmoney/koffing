import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TokenizationComponent } from './tokenization.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'tokenization',
                component: TokenizationComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class TokenizationRoutingModule { }
