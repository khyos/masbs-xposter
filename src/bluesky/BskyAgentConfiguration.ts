import { AbstractAgentConfiguration } from "../common/AbstractAgentConfiguration";

export class BskyAgentConfiguration extends AbstractAgentConfiguration {
    static ID: string = 'BSAgent';

    handle: string;
    appPassword: string;

    constructor(handle: string, appPassword: string, activated: boolean) {
        super(activated);
        this.id = BskyAgentConfiguration.ID;
        this.handle = handle;
        this.appPassword = appPassword;
    }
}