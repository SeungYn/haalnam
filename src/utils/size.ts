import { Size } from '@/types';

export function getIconSize(size: Size) {
  switch (size) {
    case 'small':
      return '16px';
    case 'medium':
      return '32px';
    case 'large':
      return '48px';
  }
}
