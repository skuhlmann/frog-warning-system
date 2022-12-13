import { DHLayout } from '@daohaus/connect';
import { Routes as Router, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Members } from './pages/Members';
import { Proposals } from './pages/Proposals';
import { Treasury } from './pages/Treasury';
import { Operations } from './pages/Operations';
import { Trading } from './pages/Trading';

export const Routes = () => {
  const { pathname } = useLocation();
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
      ]}
    >
      <Router>
        <Route path='/' element={<Home />} />
        <Route path='/members' element={<Members />} />
        <Route path='/proposals' element={<Proposals />} />
        <Route path='/treasury' element={<Treasury />} />
        <Route path='/operations' element={<Operations />} />
        <Route path='/trading' element={<Trading />} />
      </Router>
    </DHLayout>
  );
};
