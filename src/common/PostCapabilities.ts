import { Post } from "./Post";
import { PostVisibility } from "./PostVisibility";
import { ValidationError } from "./ValidationError";

export class PostCapabilities {
    // Languages
    languageMaxNumber: number; // Maximum number of languages that can be associated to a post (0 for no support)
    // Media
    mediaMaxNumber: number; // Maximum number of medias that can be associated to a post (0 for no support)
    mediaMaxIndividualSize: number; // Maximum size of an individual media (in KB)
    mediaMaxGlobalSize: number; // Maximum total size of all medias combined (in KB)
    mediaAltTextMaxLength: number; // Maximum length of the alternative text (in characters, 0 for no support)
    // Poll
    pollMaxNumber: number; // Maximum number of polls that can be associated to a post (0 for no support)
    pollMaxOptionNumber: number; // Maximum number of option inside a poll
    pollMultipleChoiceSupport: boolean // Supports user choosing multiple options for a poll
    pollHideTotalsSupport: boolean; // Supports hiding the vote counts until the poll ends
    pollCompatibleWithMedia: boolean; // Supports polls associated to post with medias
    // Reply
    replySupport: boolean; // Supports replying to a post
    // Sensitive
    sensitiveSupport: boolean; // Supports marking the post as sensitive
    sensitiveTextMaxLength: number; // Maximum length of the sensitive text (in characters, 0 for no support)
    // Text
    textMaxLength: number; // The max length of the post
    // Visibility
    visibiltyOptions: PostVisibility[]; // The list of supported post visibilities

    public validate(post: Post) : ValidationError[] {
        const validationErrors = [];
        if (post.text.length > this.textMaxLength) {
            validationErrors.push(new ValidationError('Post text exceed max supported length'));
        }
        if (post.text.length === 0 && post.medias.length === 0) {
            validationErrors.push(new ValidationError('Post needs to have at least some text or medias'));
        }
        return validationErrors;
    }
};