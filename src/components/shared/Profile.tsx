import { stringToColor } from '@/utils/color';
import { useMemo } from 'react';

interface Props {
  name: string;
  className?: string;
}

export default function Profile({ name, className }: Props) {
  const bgColor = useMemo(() => stringToColor(name), [name]);

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`flex size-8 items-center justify-center rounded-full border-2 border-white ${className}`}
    >
      {name ? name[0] : ''}
    </div>
  );
}
