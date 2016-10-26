const modalMsg = angular.module('modalMsg', []);

modalMsg.component('modalMsg', {
    templateUrl: 'shared/modal-msg/modal-msg.template.html',
    bindings: {
        message: '@',
        title: '@'
    },
    controller: function($element, $document, $timeout, modalMsg) {
        const body = angular.element($document).find('body');
        this.parsedMessage = this.message.split(';;');
        this.close = () => {
            body.removeClass('overflow-hidden');
            modalMsg.next();
            $element.remove();
        };
    }
});
