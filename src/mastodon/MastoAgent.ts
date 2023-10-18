import { createRestAPIClient } from "masto";
import { AbstractAgent } from "../common/AbstractAgent";
import { Post } from "../common/Post";
import { MastoPostValidator } from "./MastoPostValidator";
import { MastoPostCapabilities } from "./MastoPostCapabilities";

export class MastoAgent extends AbstractAgent {
    static ID: string = 'mastodon';

    agent;

    constructor() {
        super();
        this.id = MastoAgent.ID;
        this.postCapabilities = new MastoPostCapabilities();
        this.postValidator = new MastoPostValidator(this.postCapabilities);
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