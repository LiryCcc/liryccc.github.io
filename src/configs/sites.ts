interface LirySite {
  url: string;
  key: string;
  comment?: string;
}

type LirySites = LirySite[];

const LIRY_SITES: LirySites = [
  {
    url: 'https://liryccc.github.io/liry-blog',
    key: 'liry-blog'
  }
];

export { LIRY_SITES };
export type { LirySite, LirySites };
