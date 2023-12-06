import { PostCapabilities } from "../common/PostCapabilities";
import { PostVisibility } from "../common/PostVisibility";

export class BSPostCapabilities extends PostCapabilities {
    constructor() {
        super();
        this.languageMaxNumber = Number.MAX_VALUE;
        this.mediaMaxNumber = 1; // TODO find the right number
        this.mediaMaxIndividualSize = Number.MAX_VALUE; // TODO find the right number
        this.mediaMaxGlobalSize = Number.MAX_VALUE; // TODO find the right number
        this.mediaAltTextMaxLength = Number.MAX_VALUE; // TODO find the right number
        this.pollMaxNumber = 0;
        this.pollMaxOptionNumber = 0;
        this.pollMultipleChoiceSupport = false;
        this.pollHideTotalsSupport = false;
        this.pollCompatibleWithMedia = false;
        this.replySupport = true;
        this.sensitiveSupport = false;
        this.sensitiveTextMaxLength = 0;
        this.textMaxLength = 300;
        this.urlEmbedSupport = true;
        this.visibiltyOptions = [PostVisibility.PUBLIC]
    }
}