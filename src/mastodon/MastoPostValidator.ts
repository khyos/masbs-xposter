import { AbstractPostValidator } from "../common/AbstractPostValidator";
import { Post } from "../common/Post";
import { PostCapabilities } from "../common/PostCapabilities";
import { ValidationError } from "../common/ValidationError";

export class MastoPostValidator extends AbstractPostValidator {

    constructor(postCapabilities: PostCapabilities) {
        super(postCapabilities);
    }

    validate(post: Post): ValidationError[] {
        const validationErrors = this.postCapabilities.validate(post);
        return validationErrors;
    }
}