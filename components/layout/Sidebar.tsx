import { BiLogOut } from 'react-icons/bi';
import { BsBellFill, BsHouseFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import SideBarTweetButton from './SideBarTweetButton';
import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      label: 'Home',
      href: '/',
      icon: BsHouseFill,
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: BsBellFill,
      auth: true,
    },
    {
      label: 'Profile',
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      auth: true,
    },
  ];

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />

          {items.map((item) => (
            <SidebarItem key={item.href} href={item.href} label={item.label} icon={item.icon} auth={item.auth} />
          ))}

          {currentUser && <SidebarItem onClick={() => signOut()} label="Logout" icon={BiLogOut} />}

          <SideBarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
