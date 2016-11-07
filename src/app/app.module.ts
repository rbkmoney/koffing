import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { RootComponent } from './components/root/root.component.ts';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopPanelComponent } from './components/top-panel/top-panel.component.ts';
import { ContentComponent } from './components/content/content.component.ts';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            { path: '', component: ContentComponent }
        ])
    ],
    declarations: [
        RootComponent,
        SidebarComponent,
        TopPanelComponent,
        ContentComponent
    ],
    bootstrap: [ RootComponent ]
})

export class AppModule { }
