import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { KofSelectComponent } from './components/kof-select/kof-select.component';
import { KofLoadingComponent } from './components/kof-loading/kof-loading.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        KofSelectComponent,
        KofLoadingComponent
    ],
    exports: [
        KofSelectComponent,
        KofLoadingComponent
    ]
})
export class CommonModule { }
