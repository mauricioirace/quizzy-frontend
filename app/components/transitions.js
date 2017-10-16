import React from 'react';
import { CSSTransition } from 'react-transition-group';
import '../stylesheets/transitions.scss';

export const SlideFadeLeft = ({ children, ...props }) => (
  <CSSTransition
    { ...props }
    appear
    timeout={ 5000 }
    classNames='slide-fade-left'
  >
    { children }
  </CSSTransition>
);

export const SlideFadeRight = ({ children, ...props }) => (
  <CSSTransition
    { ...props }
    appear
    timeout={ 5000 }
    classNames='slide-fade-right'
  >
    { children }
  </CSSTransition>
);

export const SlideFadeTop = ({ children, ...props }) => (
  <CSSTransition
    { ...props }
    appear
    timeout={ 5000 }
    classNames='slide-fade-top'
  >
    { children }
  </CSSTransition>
);

export const SlideFadeDelayed = ({ children, ...props }) => (
  <CSSTransition
    { ...props }
    appear
    timeout={ 5000 }
    classNames='slide-fade-delayed'
  >
    { children }
  </CSSTransition>
);