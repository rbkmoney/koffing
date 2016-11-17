import * as _ from 'lodash';
import {Component, Input, OnChanges} from '@angular/core';

@Component({
    selector: 'paginate',
    templateUrl: 'paginate.component.pug'
})
export class PaginateComponent implements OnChanges {

    @Input() size: number;
    @Input() limit: number;
    @Input() offset: number;
    @Input() pagesOnScreen: number;
    @Input() onChange: Function;

    private pages: any;
    private select: any;
    private pageOffset: any;
    private forward: Function;
    private back: Function;

    constructor() {
    }

    ngOnChanges() {
        const paginate = new Paginate(this.size, this.limit, this.offset, this.pagesOnScreen, this.onChange);
        // console.log(paginate);
        this.pages = paginate.pages;
        this.select = paginate.activatePage;
        this.pageOffset = paginate.calcPageOffset();
        this.forward = paginate.forward;
        this.back = paginate.back;
    }

}
export class Paginate {

    public pages: Array<any>;
    public activatePage: any;
    public forward: Function;
    public back: Function;
    public calcPageOffset: Function;

    constructor(private size: number,
                private limit: number,
                private offset: number,
                private pagesOnScreen: number,
                private onChange: Function
    ) {
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
            const number = _.toNumber(param);
            return _.isNaN(number) ? 0 : number;
        }

        function calcPages(size: number, limit: number): number {
            if (limit === 0 || size < limit) {
                return 0;
            }
            const res = size / limit;
            return (size % limit > 0) ? res + 1 : res;
        }

        function getActive(pages: Array<any>) {
            return _.find(pages, page => page.active);
        }

        this.pages = initPages(size, limit, offset);

        this.activatePage = (activated: any) => {
            getActive(this.pages).active = false;
            activated.active = true;
            onChange({offset: activated.offset});
            return activated;
        };

        this.forward = () => {
            const index = _.indexOf(this.pages, getActive(this.pages)) + 1;
            if (this.pages.length > index) {
                return this.activatePage(this.pages[index]);
            }
        };

        this.back = () => {
            const index = _.indexOf(this.pages, getActive(this.pages)) - 1;
            if (index >= 0) {
                return this.activatePage(this.pages[index]);
            }
        };

        this.calcPageOffset = () => {
            const currentPage = (offset / limit) + 1;
            return currentPage > pagesOnScreen ? currentPage - pagesOnScreen : 0;
        };
    }
}
