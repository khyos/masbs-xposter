import { createRestAPIClient } from "masto";
import { AbstractAgent } from "../common/AbstractAgent";
import { Post } from "../common/Post";
import { MastoPostValidator } from "./MastoPostValidator";

export class MastoAgent extends AbstractAgent {
    agent: any;

    constructor() {
        super();
        this.postValidator = new MastoPostValidator();
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
            visibility: "public",
        });
    }
}