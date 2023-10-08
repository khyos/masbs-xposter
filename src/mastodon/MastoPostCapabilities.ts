import { PostCapabilities } from "../common/PostCapabilities";
import { PostVisibility } from "../common/PostVisibility";

export class MastoPostCapabilities extends PostCapabilities {
    constructor() {
        super();
        this.languageMaxNumber = 1;
        this.mediaMaxNumber = 1; // TODO find the right number, whether it is instance related or not
        this.mediaMaxIndividualSize = Number.MAX_VALUE; // TODO find the right number, whether it is instance related or not
        this.mediaMaxGlobalSize = Number.MAX_VALUE; // TODO find the right number, whether it is instance related or not
        this.mediaAltTextMaxLength = Number.MAX_VALUE; // TODO find the right number, whether it is instance related or not
        this.pollMaxNumber = 1;
        this.pollMaxOptionNumber = 4; // TODO find the right number, whether it is instance related or not
        this.pollMultipleChoiceSupport = true;
        this.pollHideTotalsSupport = true;
        this.pollCompatibleWithMedia = false;
        this.replySupport = true;
        this.sensitiveSupport = true;
        this.sensitiveTextMaxLength = Number.MAX_VALUE; // TODO find the right number, whether it is instance related or not
        this.textMaxLength = Number.MAX_VALUE; // TODO find the right number, whether it is instance related or not;
        this.visibiltyOptions = [PostVisibility.PUBLIC, PostVisibility.UNLISTED, PostVisibility.FOLLOWERS_ONLY, PostVisibility.DIRECT]
    }
}