import Home from '@/public/assets/inactive-home.svg';
import Discovery from '@/public/assets/inactive-discovery.svg';
import Wallet from '@/public/assets/inactive-wallet.svg';
import Profile from '@/public/assets/inactive-setting.svg';
import ActiveHome from '@/public/assets/Active-Home.svg';
import ActiveDiscovery from '@/public/assets/Active-discover.svg';
import ActiveWallet from '@/public/assets/Active-Wallet.svg';
import ActiveProfile from '@/public/assets/Active-setting.svg';
export const links = [
  {
    icon: Home,
    activeIcon: ActiveHome,
    link: '/promoters',
  },
  {
    icon: Discovery,
    activeIcon: ActiveDiscovery,
    link: '/promoters/discovery',
  },
  {
    icon: Wallet,
    activeIcon: ActiveWallet,
    link: '/promoters/wallet',
  },
  {
    icon: Profile,
    activeIcon: ActiveProfile,
    link: '/promoters/settings',
  },
];
