import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { InvoiceTemplate } from 'koffing/backend/model/invoice-template';
import { InvoiceTemplateService } from 'koffing/backend/invoice-template.service';
import { SearchService } from 'koffing/backend/search.service';
import { SearchInvoiceTemplatesParams } from 'koffing/backend/requests/search-invoice-templates-params';
import { ActionsInvoiceTemplates } from './actions-invoice-templates/actions-invoice-templates';
import { SearchInvoiceTemplatesBroadcaster } from 'koffing/broadcaster/broadcaster.module';

@Component({
    templateUrl: 'invoice-templates.component.pug',
    providers: [ InvoiceTemplateService ]
})
export class InvoiceTemplatesComponent implements OnInit {

    public invoiceTemplates: Subject<InvoiceTemplate[]> = new Subject();
    public searchInvoiceTemplatesParams: SearchInvoiceTemplatesParams;
    public shopID: string;
    public totalCount: number;
    public isLoading: boolean = false;
    public actions = ActionsInvoiceTemplates;
    public activeAction: ActionsInvoiceTemplates = ActionsInvoiceTemplates.none;

    private limit: number = 20;
    private offset: number = 0;

    constructor(
        private route: ActivatedRoute,
        private searchService: SearchService,
        private searchInvoiceTemplatesBroadcaster: SearchInvoiceTemplatesBroadcaster,
    ) { }

    public ngOnInit() {
        this.searchInvoiceTemplatesParams = new SearchInvoiceTemplatesParams();
        this.searchInvoiceTemplatesParams.limit = this.limit;
        this.searchInvoiceTemplatesParams.offset = this.offset;

        this.route.parent.params.subscribe((params) => {
            this.shopID = params['shopID'];
            this.search();
        });

        this.searchInvoiceTemplatesBroadcaster.on().subscribe(() => {
            this.searchInvoiceTemplatesParams.offset = 0;
            this.search();
        });
    }

    public onAction(action: ActionsInvoiceTemplates) {
        this.activeAction = action;
    }

    public onChangePage(offset: number) {
        this.searchInvoiceTemplatesParams.offset = offset;
        this.search();
    }

    public onCreate(invoiceTemplate: InvoiceTemplate) {
        this.activeAction = ActionsInvoiceTemplates.search;
        this.searchInvoiceTemplatesParams.invoiceTemplateID = invoiceTemplate.id;
        this.totalCount = 1;
        this.invoiceTemplates.next([invoiceTemplate]);
    }

    public onSearch(searchInvoiceTemplatesParams: SearchInvoiceTemplatesParams) {
        this.searchInvoiceTemplatesParams = searchInvoiceTemplatesParams;
        this.searchInvoiceTemplatesParams.offset = 0;
        this.search();
    }

    private search() {
        this.isLoading = true;
        this.searchService.searchInvoiceTemplates(this.shopID, this.searchInvoiceTemplatesParams).subscribe((response) => {
            this.totalCount = response.totalCount;
            this.invoiceTemplates.next(response.result);
            this.isLoading = false;
        });
    }
}
