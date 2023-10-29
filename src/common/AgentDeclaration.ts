import { BSAgent } from "../bluesky/BSAgent";
import { BskyAgentConfiguration } from "../bluesky/BskyAgentConfiguration";
import { MastoAgent } from "../mastodon/MastoAgent";
import { MastoAgentConfiguration } from "../mastodon/MastoAgentConfiguration";

export default {
    [BskyAgentConfiguration.ID]: BSAgent,
    [MastoAgentConfiguration.ID]: MastoAgent
};