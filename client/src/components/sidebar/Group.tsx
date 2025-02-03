import * as React from 'react';
import { ChevronRight } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';

const Group = ({ title, items, icon }: SideBarGroupProps) => {
  return (
    <Collapsible
      key={title}
      title={title}
      defaultOpen={false}
      className="group/collapsible"
    >
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="group hover:bg-customgreys-secondarybg py-6 pl-3">
            {icon}
            <h1 className="text-white-100 text-lg">{title}</h1>
            <ChevronRight className="ml-auto text-white-100 text-lg transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu className="pl-2 py-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-customgreys-secondarybg "
                  >
                    <Link
                      href={item.url}
                      className="text-white-50 text-lg hover:text-white-100 p-5"
                    >
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export default Group;
