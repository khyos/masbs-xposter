import * as fs from 'fs';
import { Post } from '../common/Post';
import { PostOrchestrator } from '../common/PostOrchestrator';

new Promise(async () => {
    const userConfig = JSON.parse(fs.readFileSync('user/config.json', 'utf8'));
    const postOrchestrator = new PostOrchestrator();
    await postOrchestrator.initializeAgents(['bluesky', 'mastodon'], userConfig)
    const post = new Post();
    post.text = 'Hello from api';
    postOrchestrator.post(post);
});