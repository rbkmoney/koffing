shops.component('claims', {
    templateUrl: 'components/shops/claims/claims.template.html',
    controller: function (Claims, modalMsg) {
        this.showClaimInfo = false;

        Claims.get({
            claimStatus: 'pending'
        }, claim => {
            this.claimID = claim.id;
            this.showClaimInfo = true;
            this.changeset = claim.changeset;
        }, error => {
            modalMsg.open([
                'Error code: ' + error.status,
                'Url: ' + error.config.url,
                'Method: ' + error.config.method,
                'JS-component: claims'
            ], 'Ошибка http-запроса');
        });

        this.revoke = () => {
            const claims = new Claims({
                reason: 'test' //TODO fix it
            });
            claims.$revoke({claimID: this.claimID}, () => {
                this.showClaimInfo = false;
            });
        };
    }
});
