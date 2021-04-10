import * as React from 'react';

type Action = { type: 'login' } | { type: 'logout' };
type Dispatch = (action: Action) => void;
type State = { logged: boolean };
type LoginProviderProps = { children: React.ReactNode };

const LoginStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function loginReducer(state: State, action: Action) {
  switch (action.type) {
    case 'login':
      return { logged: true };
    case 'logout':
      return { logged: false };
    default:
      throw new Error(`unhandled action, ${action}`);
  }
}

function LoginProvider({ children }: LoginProviderProps) {
  const [state, dispatch] = React.useReducer(loginReducer, { logged: false });
  const value = {
    state,
    dispatch,
  };

  return (
    <LoginStateContext.Provider value={value}>
      {children}
    </LoginStateContext.Provider>
  );
}

function useLogin() {
  const context = React.useContext(LoginStateContext);

  if (context === undefined) {
    throw new Error('useLogin must be used insed LoginProvider');
  }

  return context;
}

export { LoginProvider, useLogin };
