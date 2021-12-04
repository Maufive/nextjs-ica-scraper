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
    promoted: true,
  },
  {
    label: 'Recept',
    href: '/recept',
    disabled: true,
  },
  {
    label: 'Inköpslistor',
    href: '/inkopslistor',
    disabled: true,
  },

];

export default NAV_ITEMS;
