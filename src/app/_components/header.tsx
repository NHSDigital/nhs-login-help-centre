import { getHomePageLinks } from '@/lib/api';
import HeaderWithLinks from './header-client';

export default function Header() {
  return <HeaderWithLinks links={getHomePageLinks()}></HeaderWithLinks>;
}
