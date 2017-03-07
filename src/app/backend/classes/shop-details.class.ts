import * as _ from 'lodash';

import { ShopLocation } from './shop-location.class';

export class ShopDetails {
    public name: string;
    public description: string;
    public location: ShopLocation;

    constructor() {
        this.location = new ShopLocation();
    }

    public getUpdated(other: ShopDetails): ShopDetails {
        const that = new ShopDetails();
        that.name = !_.isEqual(this.name, other.name) ? other.name : this.name;
        that.description = !_.isEqual(this.description, other.description) ? other.description : this.description;
        if (other.location) {
            if (this.location.locationType !== other.location.locationType) {
                that.location = _.clone(other.location);
            } else {
                _.forEach(_.keys(this.location), (key) => {
                    that.location[key] = !_.isEqual(this.location[key], other.location[key]) ? other.location[key] : this.location[key];
                });
            }
        } else {
            that.location = _.clone(this.location);
        }
        return that;
    }
}
