import { SidebarContainer } from './style';
import { links } from '@/data/NavLinks/links';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillCaretRight } from 'react-icons/ai';

const AdminSidebar = (props) => {
  const { pathname } = useRouter();

  return (
    <SidebarContainer>
      <div className="backdrop" onClick={props.onOpenMenu}></div>
      <div className="sidebar">
        {links.map(({ name, link, icon }) => {
          const Icon = icon;

          if (props.user.role === 'sub admin' && name === 'wallet') {
            return;
          }

          return (
            <div className="link" key={link}>
              <Link href={link}>
                <a
                  className={pathname === link ? 'activeLink' : ''}
                  onClick={props.onOpenMenu}
                >
                  {pathname === link && <AiFillCaretRight />}
                  <Icon className="link-icon" />
                  <span className="link-name">{name}</span>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </SidebarContainer>
  );
};

export default AdminSidebar;
