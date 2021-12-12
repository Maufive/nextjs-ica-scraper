import { EMOJIS } from '../constants';

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getRandomEmoji() {
  const index = Math.floor(Math.random() * EMOJIS.length);
  return EMOJIS[index];
}
