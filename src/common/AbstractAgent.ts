import { IPostValidator } from "./IPostValidator";
import { Post } from "./Post";

export abstract class AbstractAgent {
    connected: boolean = false;
    postValidator: IPostValidator;

    public abstract post(post: Post): Promise<void>;

    public beforePost(post: Post): void {
        const validationErrors = this.postValidator.validate(post);
        if (validationErrors.length > 0) {
            throw new Error();
        }
    }
}