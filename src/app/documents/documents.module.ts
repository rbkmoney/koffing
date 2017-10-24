import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './documents.component';
import { ActsComponent } from './acts/acts.component';
import { RegistryComponent } from './registry/registry.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        BackendModule,
        DocumentsRoutingModule
    ],
    declarations: [
        DocumentsComponent,
        ActsComponent,
        RegistryComponent
    ]
})
export class DocumentsModule { }
