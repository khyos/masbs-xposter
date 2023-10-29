import * as fs from 'fs';
import { Post } from '../common/Post';
import { PostOrchestrator } from '../common/PostOrchestrator';
import { BskyAgentConfiguration } from '../bluesky/BskyAgentConfiguration';
import { MastoAgentConfiguration } from '../mastodon/MastoAgentConfiguration';

new Promise(async () => {
    const userConfig = JSON.parse(fs.readFileSync('user/config.json', 'utf8'));
    const postOrchestrator = new PostOrchestrator();
    await postOrchestrator.initializeAgents([
        new BskyAgentConfiguration(
            userConfig.bluesky.handle, userConfig.bluesky.appPassword, true
        ), 
        new MastoAgentConfiguration(
            userConfig.mastodon.url, userConfig.mastodon.appToken, true
        )
    ]);
    const post = new Post();
    post.text = 'Hello from api';
    postOrchestrator.post(post);
});