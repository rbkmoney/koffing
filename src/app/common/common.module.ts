import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SelectComponent } from './components/select/select.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SuggestionsService } from './services/suggestions.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        SelectComponent,
        LoadingComponent
    ],
    providers: [
        SuggestionsService
    ],
    exports: [
        SelectComponent,
        LoadingComponent
    ]
})
export class CommonModule { }

export * from './classes/suggestion-settings.const';
export * from './services/suggestions.service';
export * from './components/loading/loading.component';
export * from './components/select/select.component';
export * from './components/select/select.class';
