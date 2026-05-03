import { history } from 'umi';
import '@/styles/global.less';

export function layout(props: any) {
  if (props?.location?.pathname?.startsWith('/auth')) {
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

  if (!token && !isAuthPage) {
    history.push('/auth/login');
  }
}
