import { createRestAPIClient } from "masto";
import { AbstractAgent } from "../common/AbstractAgent";
import { Post } from "../common/Post";
import { MastoPostValidator } from "./MastoPostValidator";
import { MastoPostCapabilities } from "./MastoPostCapabilities";

export class MastoAgent extends AbstractAgent {
    agent;

    constructor() {
        super();
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
        await this.agent.v1.statuses.create({
            status: post.text,
            visibility: "public"
        });
    }
}