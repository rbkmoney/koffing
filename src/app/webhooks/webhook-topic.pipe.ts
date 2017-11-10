import { Pipe, PipeTransform } from '@angular/core';

import { TopicTypes } from './topic-types';

@Pipe({
    name: 'kofWebhookTopic'
})
export class WebhookTopicPipe implements PipeTransform {

    public transform(input: string): string {
        const status = TopicTypes[input];
        return status ? status : input;
    }
}
