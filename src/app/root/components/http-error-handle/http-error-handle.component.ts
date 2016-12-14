import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Message } from 'primeng/primeng';

import { HttpErrorBroadcaster } from 'kof-modules/broadcaster/broadcaster.module';

@Component({
    selector: 'kof-http-error-handle',
    templateUrl: './http-error-handle.component.pug'
})
export class HttpErrorHandleComponent implements OnInit {

    public messages: Message[] = [];

    constructor(
        private router: Router,
        private httpErrorBroadcaster: HttpErrorBroadcaster
    ) { }

    public ngOnInit() {
        this.router.events.subscribe(() => this.messages = []);

        this.httpErrorBroadcaster.on().subscribe((error: any) => {
            this.messages.push({
                severity: 'error',
                summary: `Код ошибки: ${error.status}`,
                detail: error.detail
            });
        });
    }
}
