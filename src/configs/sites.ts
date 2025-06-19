import { LIRY_GITHUB_NAME } from '@liry-ccc/common-config';
import { isDev } from './constant';

interface LirySite {
  url: string;
  key: string;
  logo?: string;
  comment?: string;
}

type LirySites = LirySite[];
const getLirySiteUrl = (url: string) => {
  const u = new URL(url);
  return isDev ? u.toString() : u.pathname;
};

const LIRY_SITES: LirySites = [
  {
    url: getLirySiteUrl(`https://${LIRY_GITHUB_NAME}.github.io/liry-blog`),
    key: 'liry-blog'
  }
];

export { LIRY_SITES };
export type { LirySite, LirySites };
