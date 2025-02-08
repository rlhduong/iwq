import * as React from 'react';
import { BookOpen } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import Group from './Group';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import Logout from './Logout';

const data = {
  navMain: [
    {
      title: 'Guides',
      url: '#',
      icon: <GraduationCap size={50} className="text-white-50 mr-2" />,
      items: [
        {
          title: 'Community',
          url: '/guides',
        },
        {
          title: 'My Guides',
          url: '/guides/my',
        },
        {
          title: 'Favourites',
          url: '/guides/favourites',
        },
      ],
    },
  ],
};

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className=" bg-customgreys-sidebar">
        <div className="bg-customgreys-sidebar flex flex-row gap-5 p-2 mb-2 hover:bg-customgreys-secondarybg rounded-md">
          <BookOpen size={28} className="text-white-50" />
          <Link href="/" className="text-white-50 text-xl mt-1">
            W
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0  bg-customgreys-sidebar">
        {data.navMain.map((item) => (
          <Group
            key={item.title}
            title={item.title}
            items={item.items}
            icon={item.icon}
          />
        ))}
      </SidebarContent>
      <SidebarFooter className="bg-customgreys-sidebar">
        <Logout />
      </SidebarFooter>
    </Sidebar>
  );
}
export default AppSidebar;
