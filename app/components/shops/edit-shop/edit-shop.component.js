shops.component('editShop', {
    templateUrl: 'components/shops/edit-shop/edit-shop.template.html',
    bindings: {
        $router: '<'
    },
    controller: function (Shops, Parties, Categories, modalMsg) {
        this.args = {};
        this.isLoading = false;

        this.categories = Categories.query();

        this.$routerOnActivate = route => {
            this.isLoading = true;
            this.shopID = route.params.shopId;
            Parties.get(party => {
                this.isLoading = false;
                const shop = _.find(party.shops, shop => shop.shopID === this.shopID);
                this.shopDetails = shop.shopDetails;
                this.contractor = shop.contractor;
                this.categoryRef = shop.categoryRef;
            });
        };

        const back = () => {
            this.args = {};
            this.isLoading = false;
            this.$router.navigate(['Shops']);
        };

        this.createClaim = form => {
            if (!form.$valid) {
                return;
            }
            this.args = getArgs(form);
            this.isLoading = true;
            const shops = new Shops(this.args);
            shops.$save({shopID: this.shopID}, () => back());
        };

        function getArgs(form) {
            const args = {};
            if (form.category.$dirty) {
                args.categoryRef = form.category.$modelValue;
            }
            if (form.shopDetailsName.$dirty || form.shopDetailsDescription.$dirty || form.shopDetailsLocation.$dirty) {
                args.shopDetails = {};
                args.shopDetails.name = form.shopDetailsName.$modelValue;
                args.shopDetails.description = form.shopDetailsDescription.$modelValue;
                args.shopDetails.location = form.shopDetailsLocation.$modelValue;
            }
            if (form.contractorRegisteredName.$dirty) {
                args.contractor = {};
                args.contractor.registeredName = form.contractorRegisteredName.$modelValue;
                args.contractor.legalEntity = '';
            }
            return args;
        }
    }
});
