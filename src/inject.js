/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

// Inspired by react-redux's `connect()` HOC factory function implementation:
// https://github.com/rackt/react-redux

import React, {Component} from 'react';
import invariant from 'invariant';
import withIntlContext from './components/withIntlContext'
import {intlShape} from './types';
import {invariantIntlContext} from './utils';

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

export default function injectIntl(WrappedComponent, options = {}) {
  const {intlPropName = 'intl', withRef = false} = options;

  class InjectIntl extends Component {
    static displayName = `InjectIntl(${getDisplayName(WrappedComponent)})`;

    static propTypes = {
      intl: intlShape,
    };

    static WrappedComponent = WrappedComponent;

    constructor(props) {
      super(props);
      invariantIntlContext(props);
    }

    getWrappedInstance() {
      invariant(
        withRef,
        '[React Intl] To access the wrapped instance, ' +
          'the `{withRef: true}` option must be set when calling: ' +
          '`injectIntl()`'
      );

      return this.refs.wrappedInstance;
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...{[intlPropName]: this.props.intl}}
          ref={withRef ? 'wrappedInstance' : null}
        />
      );
    }
  }

  return withIntlContext(InjectIntl);
}
