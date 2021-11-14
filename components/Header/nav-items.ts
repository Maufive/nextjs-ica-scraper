export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  disabled?: boolean;
}

const NAV_ITEMS: Array<NavItem> = [
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
  {
    label: 'Skapa matkasse',
    href: '/matkasse',
  },
];

export default NAV_ITEMS;