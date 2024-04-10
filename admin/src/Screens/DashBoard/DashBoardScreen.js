import React, { useEffect, useState } from 'react';
// import SplitscreenIcon from '@mui/icons-material/Splitscreen';
// import { IconButton } from '@mui/material';
// import BasicTabs from '../Tabs';
import MultiTaskDisplay from '../../Component/MultiTaskDisplay/MutliTaskDisplay';
import getLocalIPAddress from '../../Common/IP';
import IPAddressDisplay from '../../Common/IP';
import GetIP from '../../Common/IP';

export default function DashBoardScreen() {
  const [isCARdVisible, setIsCARdVisible] = useState(false); // Initial visibility state
  const toggleCARdVisibility = () => {
    setIsCARdVisible(!isCARdVisible);
  };
  return (
    <div>
      {/* <IconButton onClick={toggleCARdVisibility}><SplitscreenIcon /></IconButton>{isCARdVisible && <BasicTabs />} */}
      <MultiTaskDisplay />

    </div>
  );
}
