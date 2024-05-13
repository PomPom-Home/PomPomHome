export const WIDGET_KEYS = {
  SITE_LINK: 'siteLink',
  MEMO: 'memo',
  SEARCH_BOX: 'searchBox',
};

export type SiteLinkItemType = {
  linkSeq: number;
  linkTitle: string;
  linkURL: string;
};

export type SiteLinkType = {
  tabSeq: number;
  tabTitle: string;
  linkList: SiteLinkItemType[];
};
