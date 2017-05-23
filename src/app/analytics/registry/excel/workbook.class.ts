export class Workbook {
    public SheetNames: string[];
    public Sheets: any;

    constructor() {
        this.SheetNames = [];
        this.Sheets = {};
    }
}
