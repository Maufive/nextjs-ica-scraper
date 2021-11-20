import { ClipboardListIcon, ShoppingBagIcon, BookOpenIcon } from '@heroicons/react/solid';

export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  disabled?: boolean;
  promoted?: boolean;
  icon: React.SVGProps<SVGSVGElement>
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Skapa matkasse',
    href: '/matkasse',
    promoted: true,
    icon: ShoppingBagIcon,
  },
  {
    label: 'Recept',
    href: '/recept',
    disabled: true,
  },
  {
    label: 'Inköpslistor',
    href: '/inköpslistor',
    disabled: true,
  },

];

export default NAV_ITEMS;
