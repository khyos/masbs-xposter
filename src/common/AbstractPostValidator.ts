import { Post } from "./Post";
import { PostCapabilities } from "./PostCapabilities";
import { ValidationError } from "./ValidationError";

export abstract class AbstractPostValidator {
    postCapabilities: PostCapabilities;

    constructor(postCapabilities: PostCapabilities) {
        this.postCapabilities = postCapabilities;
    }

    abstract validate(post: Post): ValidationError[];
}