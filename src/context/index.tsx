import * as React from 'react';

type Payload = {
  userID: string;
};

type GameData = {
  partenerId: string;
  gameId: string;
};

type Action =
  | { type: 'login'; payload: Payload }
  | { type: 'logout' }
  | {
      type: 'create-game';
      payload: GameData;
    };

type Dispatch = (action: Action) => void;
type State = {
  logged: boolean;
  userID?: string;
  gameId?: string;
  partenerId?: string;
};
type LoginProviderProps = { children: React.ReactNode };

const LoginStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function loginReducer(state: State, action: Action) {
  switch (action.type) {
    case 'login': {
      return { ...state, logged: true, userID: action.payload.userID };
    }
    case 'logout':
      return { ...state, logged: false };
    case 'create-game':
      return { ...state, ...action.payload };
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
