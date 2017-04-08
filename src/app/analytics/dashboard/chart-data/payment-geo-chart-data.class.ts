export class PaymentGeoChartData {
    public geoIDs: string[];
    public data: number[];
    public cityNames: string[];

    constructor(geoIDs: string[], data: number[], cityNames?: string[]) {
        this.geoIDs = geoIDs;
        this.data = data;
        this.cityNames = cityNames;
    }
}
