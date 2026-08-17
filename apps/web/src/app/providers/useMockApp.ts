import { useContext } from 'react';

import { MockAppContext, type MockAppContextValue } from './mockAppContext';

export function useMockApp(): MockAppContextValue {
  const context = useContext(MockAppContext);
  if (!context) {
    throw new Error('useMockApp deve ser usado dentro de MockAppProvider.');
  }
  return context;
}
