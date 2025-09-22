import React from 'react';

import Settings from '@/components/settings/Settings';

const AdminSettings = () => {
  return (
    <div style={{ position: 'relative' }} className="dummy">
      <Settings admin={true} />
    </div>
  );
};

export default AdminSettings;
