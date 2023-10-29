import { ValidationError } from "./ValidationError";
import { AbstractAgent } from "./AbstractAgent";
import { AbstractAgentConfiguration } from "./AbstractAgentConfiguration";
import AgentDeclaration from "./AgentDeclaration";
import { Post } from "./Post";

export class PostOrchestrator {
    shouldAllBeValidBeforePost: boolean = true;
    rollbackIfOneInError: boolean = true;
    agents: AbstractAgent[] = [];

    public async initializeAgents(agentConfigurations: AbstractAgentConfiguration[]) {
        this.agents = [];
        for (const agentConfiguration of agentConfigurations) {
            const agent = new AgentDeclaration[agentConfiguration.id]();
            agent.initialize(agentConfiguration);
            this.agents.push(agent);
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