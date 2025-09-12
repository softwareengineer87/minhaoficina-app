import './header.css';
import { IconDashboard } from '@tabler/icons-react';

function Header() {
  return (
    <header className='header-container'>
      <p><IconDashboard stroke={1} /> Dashboard</p>
    </header>
  );
}

export { Header };
