import { AbstractAgentConfiguration } from "../common/AbstractAgentConfiguration";

export class MastoAgentConfiguration extends AbstractAgentConfiguration {
    static ID: string = 'mastodon';

    url: string;
    appToken: string;

    constructor(url: string, appToken: string, activated: boolean) {
        super(activated);
        this.id = MastoAgentConfiguration.ID;
        this.url = url;
        this.appToken = appToken;
    }
}