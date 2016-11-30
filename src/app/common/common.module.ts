import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { KofSelectComponent } from './kof-select/kof-select.component';
import { FormsModule } from '@angular/forms';

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
