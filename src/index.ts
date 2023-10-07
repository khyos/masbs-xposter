import { Post } from './common/Post';
import { PostOrchestrator } from './common/PostOrchestrator';

new Promise(async () => {
    const postOrchestrator = new PostOrchestrator();
    await postOrchestrator.initializeAgents(['bluesky', 'mastodon'])
    const post = new Post();
    post.text = 'Hello from api';
    postOrchestrator.post(post);
});