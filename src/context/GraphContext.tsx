import * as React from 'react';
import { Dot, Edge, ParsedData, Roles } from './useGraphData';

type DotsPayload = {
  dots: Dot[];
};
type EdgesPayload = {
  edges: Edge[];
};
type State = ParsedData;
type Action =
  | { type: 'set-dots'; payload: DotsPayload }
  | { type: 'set-edges'; payload: EdgesPayload }
  | { type: 'set-author-id'; payload: string }
  | { type: 'set-role'; payload: string };
type Dispatch = (action: Action) => void;

const GraphContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function graphContextReducer(state: State, action: Action) {
  switch (action.type) {
    case 'set-dots':
      return { ...state, dots: action.payload.dots };
    case 'set-edges':
      return { ...state, edges: action.payload.edges as Edge[] };
    case 'set-author-id':
      return { ...state, userId: action.payload as string };
    case 'set-role':
      return { ...state, role: action.payload as Roles };
    default:
      throw new Error('use proper action type');
  }
}

type GraphProviderProps = { children: React.ReactNode };

export const GraphProvider = ({ children }: GraphProviderProps) => {
  const [state, dispatch] = React.useReducer(graphContextReducer, {
    dots: [],
    edges: [],
    role: 'connect',
    userId: '',
  });
  const value = {
    state,
    dispatch,
  };

  return (
    <GraphContext.Provider value={value}>{children}</GraphContext.Provider>
  );
};

export function useGraphContext() {
  const context = React.useContext(GraphContext);

  if (context === undefined) {
    throw new Error('useLogin must be used insed LoginProvider');
  }

  return context;
}
