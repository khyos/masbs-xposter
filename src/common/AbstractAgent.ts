import { AbstractPostValidator } from "./AbstractPostValidator";
import { Post } from "./Post";
import { PostCapabilities } from "./PostCapabilities";
import { ValidationError } from "./ValidationError";

export abstract class AbstractAgent {
    activated: boolean = true;
    connected: boolean = false;
    id: string;
    postValidator: AbstractPostValidator;
    postCapabilities: PostCapabilities;

    public abstract post(post: Post): Promise<void>;

    public validate(post: Post): ValidationError[] {
        return this.postValidator.validate(post);
    }

    public beforePost(post: Post): void {
        const validationErrors = this.postValidator.validate(post);
        if (validationErrors.length > 0) {
            throw new Error();
        }
    }
}