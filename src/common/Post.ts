import { Media } from "./Media";
import { Poll } from "./Poll";
import { PostLanguage } from "./PostLanguage";
import { PostVisibility } from "./PostVisibility";
import { ReplyInfo } from "./ReplyInfo";

export class Post {
    language: PostLanguage;
    medias: Media[] = [];
    poll: Poll | null;
    replyTo: ReplyInfo | null;
    sensitive: boolean;
    sensitiveText: string;
    text: string = '';
    visibility: PostVisibility;
}