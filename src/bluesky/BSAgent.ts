import { BskyAgent } from "@atproto/api";
import { AbstractAgent } from "../common/AbstractAgent";
import { Post } from "../common/Post";
import { BSPostValidator } from "./BSPostValidator";
import { BSPostCapabilities } from "./BSPostCapabilities";

export class BSAgent extends AbstractAgent {
    static ID: string = 'BSAgent';

    agent: BskyAgent;

    constructor() {
        super();
        this.id = BSAgent.ID;
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