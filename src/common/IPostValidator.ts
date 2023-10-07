import { Post } from "./Post";
import { ValidationError } from "./ValidationError";

export interface IPostValidator {
    validate(post: Post): ValidationError[]
}