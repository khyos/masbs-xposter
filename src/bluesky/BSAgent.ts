import { BskyAgent } from "@atproto/api";
import { AbstractAgent } from "../common/AbstractAgent";
import { Post } from "../common/Post";
import { BSPostValidator } from "./BSPostValidator";
import { BSPostCapabilities } from "./BSPostCapabilities";

export class BSAgent extends AbstractAgent {
    agent: BskyAgent;

    constructor() {
        super();
        this.postCapabilities = new BSPostCapabilities();
        this.postValidator = new BSPostValidator(this.postCapabilities);
    }

    public async auth(handle: string, appPassword: string) {
        this.agent = new BskyAgent({ service: "https://bsky.social" });
        await this.agent.login({
            identifier: handle,
            password: appPassword,
        });
    }

    public async post(post: Post) {
        this.beforePost(post);
        await this.agent.post({ text: post.text });
    }
}