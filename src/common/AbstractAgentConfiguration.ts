export abstract class AbstractAgentConfiguration {
    activated: boolean = null;
    id: string;

    constructor(activated: boolean) {
        this.activated = activated;
    }
}