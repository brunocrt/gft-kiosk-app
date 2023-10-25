// FadeContext.js
import { createContext } from 'react';

const FadeContext = createContext({
  fadeOut: (duration) => {},
  fadeIn: (duration) => {},
});

export const FadeProvider = FadeContext.Provider;

export default FadeContext;
