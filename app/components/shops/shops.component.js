shops.component('shops', {
    templateUrl: 'components/shops/shops.template.html',
    controller: function (Parties, Shops, Categories, modalMsg) {

        this.categories = Categories.query();

        this.getCategory = ref => _.find(this.categories, category => category.categoryRef === ref);

        const getParty = () => {
            this.isLoading = true;
            Parties.get(party => {
                this.isLoading = false;
                this.shops = party.shops;
            }, error => {
                modalMsg.open([
                    'Error code: ' + error.status,
                    'Url: ' + error.config.url,
                    'Method: ' + error.config.method,
                    'JS-component: shops'
                ], 'Ошибка http-запроса');
            });
        };

        this.$routerOnActivate = () => getParty();

        this.activate = shop => {
            this.isLoading = true;
            const shops = new Shops();
            shops.$activate({shopID: shop.shopID}, () => getParty());
        };
    }
});
