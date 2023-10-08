import { BSAgent } from "../bluesky/BSAgent";
import { MastoAgent } from "../mastodon/MastoAgent";
import { AbstractAgent } from "./AbstractAgent";
import { Post } from "./Post";

export class PostOrchestrator {
    shouldAllBeValidBeforePost: boolean = true;
    rollbackIfOneInError: boolean = true;
    agents: AbstractAgent[] = [];

    public async initializeAgents(agentsIds, userConfig) {
        for (const agentId of agentsIds) {
            switch (agentId) {
                case 'bluesky':
                    const bsAgent = new BSAgent();
                    await bsAgent.auth(userConfig.bluesky.handle, userConfig.bluesky.appPassword);
                    this.agents.push(bsAgent);
                    break;
                case 'mastodon':
                    const mastoAgent = new MastoAgent();
                    await mastoAgent.auth(userConfig.mastodon.url, userConfig.mastodon.appToken);
                    this.agents.push(mastoAgent);
                    break;
                default:
                    break;
            }
        }
    }

    public post(post: Post) {
        if (this.shouldAllBeValidBeforePost) {
            for (const agent of this.agents) {
                if (agent.validate(post).length > 0) {
                    throw new Error('validator KO');
                }
            }
        }
        const agentPostStatuses = new Map();
        const postPromises: Promise<void>[] = [];
        
        for (const agent of this.agents) {
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