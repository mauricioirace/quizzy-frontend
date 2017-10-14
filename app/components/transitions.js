import React from 'react';
import { CSSTransition } from 'react-transition-group';
import '../stylesheets/transitions.scss';

export const SlideFade = ({ children, ...props }) => (
  <CSSTransition
    { ...props }
    appear
    timeout={ 1000 }
    classNames='slide-fade'
  >
    { children }
  </CSSTransition>
);

export const ZoomInFade = ({ children, ...props }) => (
  <CSSTransition
    { ...props }
    appear
    timeout={ 1000 }
    classNames='zoom-in-fade'
  >
    { children }
  </CSSTransition>
);