import { ValidationError } from "..";
import { BSAgent } from "../bluesky/BSAgent";
import { MastoAgent } from "../mastodon/MastoAgent";
import { AbstractAgent } from "./AbstractAgent";
import { Post } from "./Post";

export class PostOrchestrator {
    shouldAllBeValidBeforePost: boolean = true;
    rollbackIfOneInError: boolean = true;
    agents: AbstractAgent[] = [];

    public async initializeAgents(agentsIds, userConfig) {
        this.agents = [];
        for (const agentId of agentsIds) {
            switch (agentId) {
                case BSAgent.ID:
                    const bsAgent = new BSAgent();
                    await bsAgent.auth(userConfig.bluesky.handle, userConfig.bluesky.appPassword);
                    this.agents.push(bsAgent);
                    break;
                case MastoAgent.ID:
                    const mastoAgent = new MastoAgent();
                    await mastoAgent.auth(userConfig.mastodon.url, userConfig.mastodon.appToken);
                    this.agents.push(mastoAgent);
                    break;
                default:
                    break;
            }
        }
    }

    public getAgentByID(id: string) : AbstractAgent {
        return this.agents.find(agent => agent.id === id);
    }

    public getActivatedAgents() : AbstractAgent[] {
        return this.agents.filter(agent => agent.activated);
    }

    public validatePost(post: Post) {
        const validationErrors = {};
        const activatedAgents = this.getActivatedAgents();
        for (const agent of activatedAgents) {
            validationErrors[agent.id] = agent.validate(post);
        }
        return validationErrors;
    }

    public areAllAgentsInValidationError(validationErrors) : boolean {
        return !Object.values(validationErrors).find((it: ValidationError[]) => it.length === 0);
    }

    public isOneAgentInValidationError(validationErrors) : boolean {
        return !!Object.values(validationErrors).find((it: ValidationError[]) => it.length > 0);
    }

    public post(post: Post) : void {
        const activatedAgents = this.getActivatedAgents();
        const validationErrors = this.validatePost(post);

        if (this.areAllAgentsInValidationError(validationErrors)) {
            throw new Error('validator KO');
        }
        if (this.shouldAllBeValidBeforePost && this.isOneAgentInValidationError(validationErrors)) {
            throw new Error('validator KO');
        }
        const agentPostStatuses = new Map();
        const postPromises: Promise<void>[] = [];
        
        for (const agent of activatedAgents) {
            postPromises.push(agent.post(post));
        }
        Promise.all(postPromises).then(() => {

        }).catch(() => {
            if (this.rollbackIfOneInError) {
                this.rollbackPost(post);
            }
        });
    }

    rollbackPost(post: Post) {
        //TODO
    }
}