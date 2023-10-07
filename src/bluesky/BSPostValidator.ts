import { IPostValidator } from "../common/IPostValidator";
import { Post } from "../common/Post";
import { ValidationError } from "../common/ValidationError";

export class BSPostValidator implements IPostValidator {
    validate(post: Post): ValidationError[] {
        return [];
    }
}