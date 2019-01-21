import React from 'react';
import {Consumer as IntlConsumer} from './provider.js';

export default function withIntlContext(Component) {
  return function (props) {
    return (
      <IntlConsumer>
        {(intl) => (
          <Component
            {...props}
            intl={intl}
          />
        )}
      </IntlConsumer>
    )
  }
}
