import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionsInvoiceTemplates } from './actions-invoice-templates';

@Component({
    selector: 'kof-actions-invoice-templates',
    templateUrl: 'actions-invoice-templates.component.pug'
})
export class ActionsInvoiceTemplatesComponent {

    @Output()
    public onAction: EventEmitter<ActionsInvoiceTemplates> = new EventEmitter();

    @Input()
    public activeAction: ActionsInvoiceTemplates;

    public actions = ActionsInvoiceTemplates;

    public select(action: ActionsInvoiceTemplates) {
        this.activeAction = (this.activeAction === action) ? ActionsInvoiceTemplates.none : action;
        this.onAction.emit(this.activeAction);
    }

    public getClass(action: ActionsInvoiceTemplates) {
        return this.activeAction === action ? 'fa-caret-down' : 'fa-caret-right';
    }
}
