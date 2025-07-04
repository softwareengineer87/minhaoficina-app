
import { IconChevronCompactLeft, IconChevronCompactRight, IconHome, IconLogout2, IconTools, IconUser } from '@tabler/icons-react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../data/contexts/AuthContext';

function Sidebar() {

  const [open, setOpen] = useState<boolean>(false);
  const { logout } = useContext(AuthContext);

  function openSidebar() {
    setOpen((state) => !state);
  }

  return (
    <section className={`sidebar-container ${open ? 'open-sidebar' : ''}`}>
      {open ? (
        <IconChevronCompactLeft className='icon-open' onClick={openSidebar} />
      ) : (
        <IconChevronCompactRight className='icon-open' onClick={openSidebar} />
      )}
      <div className="sidebar">
        <header className='header-sidebar'>
          <img src='./logo.png' alt='Logotipo' />
          <h4 className='close'>Oficina</h4>
        </header>
        <nav className='menu'>
          <ul>
            <li><Link className='link' to='/'><IconHome stroke={1} /><span className='close'>Home</span></Link></li>
            <li><Link className='link' to='/create-launch'><IconTools stroke={1} /><span className='close'>Criar lançamento</span></Link></li>
            <li><Link className='link' to='/profile'><IconUser stroke={1} /><span className='close'>Sua conta</span></Link></li>
          </ul>
        </nav>
      </div>
      <button
        onClick={logout}
        className='btn-logout'>
        <IconLogout2 className='icon-logout' stroke={1} />
        <span className='close'>Sair</span>
      </button>
    </section>
  );
}

export { Sidebar }

