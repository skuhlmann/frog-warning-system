import { DHLayout, useDHConnect } from '@daohaus/connect';
import { Routes as Router, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Members } from './pages/Members';
import { Proposals } from './pages/Proposals';
import { Treasury } from './pages/Treasury';
import { Operations } from './pages/Operations';
import { Trading } from './pages/Trading';
import { Settings } from './pages/Settings';
import { MolochV3DaoProvider } from '@daohaus/moloch-v3-context';
import Member from './pages/Member';

export const Routes = () => {
  const { pathname } = useLocation();
  const { address } = useDHConnect();

  return (
    <DHLayout
      pathname={pathname}
      navLinks={[
        { label: 'Home', href: '/' },
        { label: 'Proposals', href: '/proposals' },
        { label: 'Members', href: '/members' },
        { label: 'Treasury', href: '/treasury' },
        { label: 'Operations', href: '/operations' },
        { label: 'Trading', href: '/trading' },
        { label: 'Settings', href: '/settings' },
      ]}
    >
      <MolochV3DaoProvider
        address={address}
        daoid='0x9789ac55e21939f3cc771325c6a23e8497182042'
        daochain='0x5'
        graphApiKeys={{}}
      >
        <Router>
          <Route path='/' element={<Home />} />
          <Route path='/members' element={<Members />} />
          <Route path='/members/:memberAddress' element={<Member />} />
          <Route path='/proposals' element={<Proposals />} />
          <Route path='/treasury' element={<Treasury />} />
          <Route path='/operations' element={<Operations />} />
          <Route path='/trading' element={<Trading />} />
          <Route path='/settings' element={<Settings />} />
        </Router>
      </MolochV3DaoProvider>
    </DHLayout>
  );
};
