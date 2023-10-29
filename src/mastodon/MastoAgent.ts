import { createRestAPIClient } from "masto";
import { AbstractAgent } from "../common/AbstractAgent";
import { Post } from "../common/Post";
import { MastoPostValidator } from "./MastoPostValidator";
import { MastoPostCapabilities } from "./MastoPostCapabilities";
import { MastoAgentConfiguration } from "./MastoAgentConfiguration";
import { AbstractAgentConfiguration } from "../common/AbstractAgentConfiguration";

export class MastoAgent extends AbstractAgent {
    agent;

    constructor() {
        super();
        this.id = MastoAgentConfiguration.ID;
        this.postCapabilities = new MastoPostCapabilities();
        this.postValidator = new MastoPostValidator(this.postCapabilities);
    }

    public async initialize(agentConfiguration: AbstractAgentConfiguration): Promise<void> {
        if (agentConfiguration instanceof MastoAgentConfiguration) {
            await this.auth(agentConfiguration.url, agentConfiguration.appToken);
            if (agentConfiguration.activated != null) {
                this.activated = agentConfiguration.activated;
            }
        } else {
            throw Error('MastoAgent: Incompatible Configuration');
        }
    }
    
    public async auth(url: string, appToken: string) {
        this.agent = createRestAPIClient({
            url: url,
            accessToken: appToken,
        });
    }

    public async post(post: Post) {
        this.beforePost(post);

        const mastoPostModel: any = {
            visibility: 'public'
        };
        if (post.text) {
            mastoPostModel.status = post.text
        }
        for (const media of post.medias) {
            const uploadedBlob = await this.agent.v2.media.create({
                file: media.file
            });
            
            if (!mastoPostModel.mediaIds) {
                mastoPostModel.mediaIds = [];
            }
            mastoPostModel.mediaIds.push(uploadedBlob.id);
        }

        await this.agent.v1.statuses.create(mastoPostModel);
    }
}