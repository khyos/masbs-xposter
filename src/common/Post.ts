import { Media } from "./Media";
import { Poll } from "./Poll";
import { PostLanguage } from "./PostLanguage";
import { PostVisibility } from "./PostVisibility";
import { ReplyInfo } from "./ReplyInfo";
import { URLEmbed } from "./URLEmbed";

export class Post {
    language: PostLanguage;
    medias: Media[] = [];
    poll: Poll | null;
    replyTo: ReplyInfo | null;
    sensitive: boolean;
    sensitiveText: string;
    text: string = '';
    urlEmbed: URLEmbed | null;
    visibility: PostVisibility;
}