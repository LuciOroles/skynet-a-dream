import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useLogin } from '../context';

export interface IProtectedRouteProps {
  path: string;
  component: React.ComponentType;
  exact: boolean;
}

export default function ProtectedRoute({
  component,
  path,
  exact,
  ...rest
}: IProtectedRouteProps) {
  const { state } = useLogin();

  if (!state.logged) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Route path={path} exact={exact} component={component} {...rest} />
    </div>
  );
}
