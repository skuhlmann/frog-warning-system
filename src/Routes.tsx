import { DHLayout } from '@daohaus/connect';
import { Routes as Router, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Treasury } from './pages/Treasury';
import { Operations } from './pages/Operations';
import { Trading } from './pages/Trading';
import { Members } from './pages/Members';

export const Routes = () => {
  const { pathname } = useLocation();
  return (
    <DHLayout
      pathname={pathname}
      navLinks={[
        { label: 'Home', href: '/' },
        { label: 'Treasury', href: '/treasury' },
        { label: 'Operations', href: '/operations' },
        { label: 'Trading', href: '/trading' },
        { label: 'Members', href: '/members' },
      ]}
    >
      <Router>
        <Route path='/' element={<Home />} />
        <Route path='/treasury' element={<Treasury />} />
        <Route path='/operations' element={<Operations />} />
        <Route path='/trading' element={<Trading />} />
        <Route path='/members' element={<Members />} />
      </Router>
    </DHLayout>
  );
};
