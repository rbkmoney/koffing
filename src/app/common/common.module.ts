import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { KofSelectComponent } from './components/kof-select/kof-select.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        KofSelectComponent
    ],
    exports: [
        KofSelectComponent
    ]
})
export class CommonModule { }
