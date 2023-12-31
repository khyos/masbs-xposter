import { BskyAgent } from "@atproto/api";
import { AbstractAgent } from "../common/AbstractAgent";
import { Post } from "../common/Post";
import { BSPostValidator } from "./BSPostValidator";
import { BSPostCapabilities } from "./BSPostCapabilities";
import { BskyAgentConfiguration } from "./BskyAgentConfiguration";
import { AbstractAgentConfiguration } from "../common/AbstractAgentConfiguration";

export class BSAgent extends AbstractAgent {
    agent: BskyAgent;

    constructor() {
        super();
        this.id = BskyAgentConfiguration.ID;
        this.postCapabilities = new BSPostCapabilities();
        this.postValidator = new BSPostValidator(this.postCapabilities);
    }

    public async initialize(agentConfiguration: AbstractAgentConfiguration): Promise<void> {
        if (agentConfiguration instanceof BskyAgentConfiguration) {
            await this.auth(agentConfiguration.handle, agentConfiguration.appPassword);
            if (agentConfiguration.activated != null) {
                this.activated = agentConfiguration.activated;
            }
        } else {
            throw Error('BskyAgent: Incompatible Configuration');
        }
    }

    public async auth(handle: string, appPassword: string) {
        this.agent = new BskyAgent({ service: 'https://bsky.social' });
        await this.agent.login({
            identifier: handle,
            password: appPassword,
        });
    }

    public async post(post: Post) {
        this.beforePost(post);

        const bskyPostModel: any = {};
        if (post.text) {
            bskyPostModel.text = post.text
        }
        for (const media of post.medias) {
            const blob : any = await media.fileAsUint8Array();
            const uploadedBlob = await this.agent.uploadBlob(blob, {
                encoding: media.encoding
            });
            if (!bskyPostModel.embed) {
                bskyPostModel.embed = {
                    '$type': 'app.bsky.embed.images',
                    'images': []
                }
            }
            bskyPostModel.embed.images.push({
                alt: '',
                image: uploadedBlob.data.blob
            });
        }
        await this.agent.post(bskyPostModel);
    }
}