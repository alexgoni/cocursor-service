import useMediaQuery, { MOBILE_WIDTH } from '@/hooks/useMediaQuery';
import { ReactNode } from 'react';

interface Props {
  mobile: ReactNode;
  pc: ReactNode;
}

export default function ResponsiveRenderer({ mobile, pc }: Props) {
  const isMobile = useMediaQuery(MOBILE_WIDTH);

  return <>{isMobile ? mobile : pc}</>;
}
