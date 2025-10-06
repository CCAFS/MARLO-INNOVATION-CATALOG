import type { ShareParams } from "~/interfaces/share-params.interface";
import networks from "~/jsons/networks";
import { normalizeParams, getNetworkSharingTemplate, processLinkTemplate } from "../params/params";
import type { SocialNetwork } from "~/interfaces/social-network.interface";

const getSharingLink = (shareParams: ShareParams) => {
    const networksList = networks as SocialNetwork;
    const linkParts = normalizeParams(shareParams);
    if (!linkParts.network || !networksList[linkParts.network]) {
        throw new Error(`Network ${linkParts.network} does not exist`);
    }
    let linkTemplate = getNetworkSharingTemplate(linkParts.network, networksList);
    /**
     * Twitter sharing shouldn't include empty parameter
     * Source: https://github.com/nicolasbeauvais/vue-social-sharing/issues/143
     */
    if (linkParts.network === "twitter") {
        if (!linkParts.hashtags.length) {
        linkTemplate = linkTemplate.replace("&hashtags=@h", "");
        }
        if (!linkParts.twitterUser.length) {
        linkTemplate = linkTemplate.replace("&via=@tu", "");
        }
    }

    return processLinkTemplate(linkTemplate, linkParts);
};

export default getSharingLink;

/**
 *  Source Base Code: https://github.com/hedint/vue3-social-sharing
 */