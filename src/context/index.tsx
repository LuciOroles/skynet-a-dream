import * as React from 'react';

type Payload = {
  userID: string;
};

type Action = { type: 'login'; payload: Payload } | { type: 'logout' };
type Dispatch = (action: Action) => void;
type State = { logged: boolean; userID?: string };
type LoginProviderProps = { children: React.ReactNode };

const LoginStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function loginReducer(state: State, action: Action) {
  switch (action.type) {
    case 'login': {
      return { logged: true, userID: action.payload.userID };
    }
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
