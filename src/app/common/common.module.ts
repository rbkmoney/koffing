import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { KofSelectComponent } from './components/kof-select/kof-select.component';
import { KofLoadingComponent } from './components/kof-loading/kof-loading.component';
import { SlimBarService } from 'kof-modules/common/services/slim-bar.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [
        SlimBarService
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

export * from './components/kof-loading/kof-loading.component';
export * from './components/kof-select/kof-select.component';
export * from './components/kof-select/kof-select.class';
export * from './services/slim-bar.service';
