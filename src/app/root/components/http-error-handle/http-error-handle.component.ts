import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/primeng';

import { HttpErrorBroadcaster } from 'kof-modules/broadcaster/broadcaster.module';

@Component({
    selector: 'kof-http-error-handle',
    templateUrl: './http-error-handle.component.pug'
})
export class HttpErrorHandleComponent implements OnInit {

    public messages: Message[] = [];

    constructor(
        private httpErrorBroadcaster: HttpErrorBroadcaster
    ) { }

    public ngOnInit() {
        this.httpErrorBroadcaster.on().subscribe((error: any) => {
            this.messages.push({severity: 'warn', summary: `Код ошибки: ${error.status}`, detail: error.detail});
        });
    }
}
