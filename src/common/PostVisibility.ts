export enum PostVisibility {
    PUBLIC, // The default status. Public posts are visible to any other user on the public timelines, appears on your user profile page to anyone including search engine bots and visitors who aren't logged.
    UNLISTED, // Other than not appearing in the public timelines or search results, they function identically to public posts.
    FOLLOWERS_ONLY, // Do not appear in the public timeline nor on your profile page to anyone viewing it unless they are on your Followers list.
    DIRECT // Post is only visible to users you have @mentioned in them and cannot be boosted.
};