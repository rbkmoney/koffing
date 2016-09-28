shops.component('claimForm', {
    templateUrl: 'components/shops/claim-form/claim-form.template.html',
    bindings: {
        $router: '<'
    },
    controller: function (Shops, Parties) {
        this.args = {};
        this.isLoading = false;

        this.$routerOnActivate = route => {
            this.mode = route.params.shopId ? 'edit' : 'add';
            if (this.mode === 'edit') {
                this.isLoading = true;
                this.shopID = route.params.shopId;
                Parties.get(party => {
                    this.isLoading = false;
                    const shop = _.find(party.shops, shop => shop.shopID === this.shopID);
                    this.args.shopDetails = shop.shopDetails;
                    this.args.contractor = shop.contractor;
                });
            }
        };

        const back = () => {
            this.args = {};
            this.isLoading = false;
            this.$router.navigate(['Shops']);
        };

        this.createClaim = form => {
            if (form.$valid) {
                this.isLoading = true;
                const shops = new Shops(this.args);
                if (this.mode === 'add') {
                    shops.$save(() => back());
                } else if (this.mode === 'edit') {
                    shops.$save({shopID: this.shopID}, () => back());
                }
            }
        };

        this.hasError = field => field.$dirty && field.$invalid;
    }
});
