export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  disabled?: boolean;
  promoted?: boolean;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Skapa matkasse',
    href: '/matkasse',
  },
  {
    label: 'Recept',
    href: '/recept',
  },
  {
    label: 'Inköpslistor',
    href: '/inkopslistor',
  },

];

export default NAV_ITEMS;
