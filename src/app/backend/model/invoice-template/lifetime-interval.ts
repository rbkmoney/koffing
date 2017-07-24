export class LifetimeInterval {
    public days: number;
    public months: number;
    public years: number;

    constructor(days: number, months: number, years: number) {
        this.days = days || 0;
        this.months = months || 0;
        this.years = years || 0;

        if (this.days + this.months + this.years === 0) {
            this.days = 1;
        }
    }
}
