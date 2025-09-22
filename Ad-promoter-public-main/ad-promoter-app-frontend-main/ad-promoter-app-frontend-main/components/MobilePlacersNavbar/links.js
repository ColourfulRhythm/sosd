import Home from '@/public/assets/inactive-home.svg';
import Flash from '@/public/assets/flash.svg';
import activities from '@/public/assets/Activities.svg';
import Profile from '@/public/assets/inactive-setting.svg';
import ActiveHome from '@/public/assets/Active-Home.svg';
import ActiveDiscovery from '@/public/assets/activeAd.svg';
import activeActivities from '@/public/assets/activeActivities.svg';
import ActiveProfile from '@/public/assets/Active-setting.svg';
export const links = [
  {
    icon: Home,
    activeIcon: ActiveHome,
    link: '/placers',
  },
  {
    icon: Flash,
    activeIcon: ActiveDiscovery,
    link: '/placers/adcreator',
  },
  {
    icon: activities,
    activeIcon: activeActivities,
    link: '/placers/activities',
  },
  {
    icon: Profile,
    activeIcon: ActiveProfile,
    link: '/placers/settings',
  },
];
