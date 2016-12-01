import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'kof-paginate',
    templateUrl: 'paginate.component.pug'
})
export class PaginateComponent implements OnInit {

    @Input()
    public size: number;

    @Input()
    public limit: number;

    @Input()
    public offset: number;

    @Input()
    public pagesOnScreen: number;

    @Output()
    public onChange: EventEmitter<any> = new EventEmitter<any>();

    private pages: Array<any>;

    public select(event: MouseEvent, page: any) {
        event.preventDefault();
        return this.activatePage(page);
    }

    public forward(event: MouseEvent) {
        event.preventDefault();
        const index = _.indexOf(this.pages, this.getActive()) + 1;
        if (this.pages.length > index) {
            return this.activatePage(this.pages[index]);
        }
    }

    public back(event: MouseEvent) {
        event.preventDefault();
        const index = _.indexOf(this.pages, this.getActive()) - 1;
        if (index >= 0) {
            return this.activatePage(this.pages[index]);
        }
    }

    public getActive() {
        return _.find(this.pages, page => page.active);
    }

    public activatePage(page: any) {
        this.getActive().active = false;
        page.active = true;
        this.onChange.emit(page.offset);
        return page;
    }

    public pageOffset() {
        const currentPageIndex = (this.offset / this.limit);
        const offset = _.round(this.pagesOnScreen / 2);
        return currentPageIndex > offset ? currentPageIndex - offset : 0;
    }

    public ngOnInit() {
        this.pages = initPages(this.size, this.limit, this.offset);

        function initPages(itemsSize: number, itemsLimit: number, itemsOffset: number): Array<any> {
            const size = initParam(itemsSize);
            const limit = initParam(itemsLimit);
            const offset = initParam(itemsOffset);
            let pages: Array<any> = [];
            for (let page = 1; page <= calcPages(size, limit); page++) {
                const calcOffset = (page - 1) * limit;
                pages.push({
                    active: calcOffset === offset,
                    label: page,
                    offset: calcOffset
                });
            }
            return pages;
        }

        function initParam(param: number): number {
            const result = _.toNumber(param);
            return _.isNaN(result) ? 0 : result;
        }

        function calcPages(size: number, limit: number): number {
            if (limit === 0 || size < limit) {
                return 0;
            }
            const res = size / limit;
            return (size % limit > 0) ? res + 1 : res;
        }
    }
}
