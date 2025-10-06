import { toValue } from "vue";
import type { ShareParams } from "~/interfaces/share-params.interface";
import type { SocialNetwork } from "~/interfaces/social-network.interface";

const getNetworkSharingTemplate = (networkKey: string, netWorkList: SocialNetwork): string => {
  return netWorkList[networkKey];
};

const encodeHashtags = (hashTags: string, networkKey: string) => {
  if (networkKey === "facebook" && hashTags && hashTags.length > 0) {
    return `%23${hashTags.split(",")[0]}`;
  }
  return hashTags;
};

const getDefaultParams = (): Required<ShareParams> => {
  return {
    network: "",
    url: "",
    title: "",
    description: "",
    quote: "",
    hashtags: "",
    twitterUser: "",
  };
};

const normalizeParams = (shareParams: ShareParams): Required<ShareParams> => {
  const defaultParams = getDefaultParams();
  return Object.fromEntries((Object.keys(defaultParams) as Array<keyof ShareParams>).map((paramName) => {
    let paramValue = toValue(shareParams[paramName]) || defaultParams[paramName];
    paramValue = paramName === "hashtags" ? encodeHashtags(paramValue, paramName) : encodeURIComponent(paramValue);
    return [paramName, paramValue];
  })) as Required<ShareParams>;
};

const processLinkTemplate = (linkTemplate: string, linkParts: Required<ShareParams>) => {
  return linkTemplate
    .replace(/@tu/g, linkParts.twitterUser)
    .replace(/@u/g, linkParts.url)
    .replace(/@t/g, linkParts.title)
    .replace(/@d/g, linkParts.description)
    .replace(/@q/g, linkParts.quote)
    .replace(/@h/g, linkParts.hashtags)
};

export {
  getNetworkSharingTemplate,
  encodeHashtags,
  getDefaultParams,
  normalizeParams,
  processLinkTemplate,
};

/** 
 * This function generates a sharing link for a specific social network
 * Source: https://github.com/hedint/vue3-social-sharing/blob/master/src/utils/params.ts
 */ 
