import { IPostValidator } from "../common/IPostValidator";
import { Post } from "../common/Post";
import { ValidationError } from "../common/ValidationError";

export class MastoPostValidator implements IPostValidator {
    validate(post: Post): ValidationError[] {
        const validationErrors = [];
        if (post.text.length === 0 && post.medias.length === 0) {
            validationErrors.push('Mastodon : Post needs to have at least some text or medias');
        }
        return validationErrors;
    }
}