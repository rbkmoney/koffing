import { NgModule } from '@angular/core';
import { Broadcaster } from './services/broadcaster.service';
import { ToggleMenuBroadcaster } from './services/toggle-menu-broadcaster.service';

@NgModule({
    providers: [
        Broadcaster,
        ToggleMenuBroadcaster
    ]
})
export class BroadcasterModule { }

export * from './services/broadcaster.service';
export * from './services/toggle-menu-broadcaster.service';
