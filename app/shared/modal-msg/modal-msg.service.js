modalMsg.factory('modalMsg', ($document, $rootScope, $compile) => {

    let messages = [];
    let isOpened = false;
    let componentScope;
    const body = angular.element($document).find('body');

    const createModal = (message) => {
        const dataMessage = (Array.isArray(message.message)) ? message.message.join(';;') : message.message;
        const componentTemplate = `<modal-msg data-message="${dataMessage}" data-title="${message.title}"></modal-msg>`;

        componentScope = $rootScope.$new(true);
        const componentCompiled = $compile(componentTemplate)(componentScope);

        body.append(componentCompiled);
        body.addClass('overflow-hidden');
    };

    return {
        open: (message, title) => {
            if(!message || !message.length) {
                return;
            }

            messages.push({'message': message, 'title': title || ''});
            if(!isOpened) {
                isOpened = true;
                createModal(messages[0]);
            }
        },
        next: () => {
            if(componentScope) {
                componentScope.$destroy();
            }
            isOpened = false;

            messages.shift();
            if(messages.length) {
                createModal(messages[0]);
            }
        }
    }
});