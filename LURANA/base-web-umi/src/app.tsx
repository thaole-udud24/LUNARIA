import { history } from 'umi';
import '@/styles/global.less';

export function layout(props: any) {
  const pathname = props?.location?.pathname || '';

  if (
    pathname.startsWith('/auth') ||
    pathname.startsWith('/admin')
  ) {
    return {
      layout: false,
    };
  }

  return {};
}

export interface InitialState {
  user?: {
    id: number;
    email: string;
    name?: string;
  } | null; 
}

// Umi sẽ dùng cái này làm global state
export async function getInitialState(): Promise<InitialState> {
  return {
    user: null,
  };
}

export function onRouteChange({ location }: any) {
  const token = localStorage.getItem('token');

  const isAuthPage = location.pathname.startsWith('/auth');
  const isPublicShopPage =
    location.pathname === '/' ||
    location.pathname.startsWith('/home') ||
    location.pathname.startsWith('/about') ||
    location.pathname.startsWith('/products') ||
    location.pathname.startsWith('/blog') ||
    location.pathname.startsWith('/contact');

  if (!token && !isAuthPage && !isPublicShopPage) {
    history.push('/auth/login');
  }
}
