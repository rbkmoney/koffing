import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {TokenizationRoutingModule} from './tokenization-routing.module';
import {TokenizationComponent} from './tokenization.component';

@NgModule({
    imports: [
        BrowserModule,
        TokenizationRoutingModule
    ],
    declarations: [
        TokenizationComponent
    ]
})
export class TokenizationModule {
    
}