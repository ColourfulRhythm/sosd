import {
  profileSettings,
  securitySettings,
  settingSettings,
  cardSettings,
  lockCircleSettings,
} from '@/public/assets/icon';

export const categories = [
  { id: 0, category: 'Profile', icon: profileSettings },
  { id: 1, category: 'General', icon: settingSettings },
  { id: 2, category: 'Notification', icon: profileSettings },
  { id: 3, category: 'Secuirity', icon: securitySettings },
  { id: 4, category: 'Payment', icon: cardSettings },
  { id: 5, category: 'Privacy policy', icon: lockCircleSettings },
];

export const adminSettingCategories = [
  { id: 0, category: 'Profile', icon: profileSettings },
  { id: 1, category: 'General' , icon: settingSettings},
  { id: 2, category: 'Secuirity', icon: securitySettings },
  { id: 3, category: 'Administrator', icon: profileSettings },
];
