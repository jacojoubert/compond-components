import Ember from 'ember';

export default Ember.Component.extend({
  error: false,
  displayError: 'auto',

  _forceShowError: Ember.computed.equal('displayError', 'always'),
  _forceHideError: Ember.computed.equal('displayError', 'never'),

  isFocused: false,
  _wasFocused: false,
  _previousErrorState: undefined,

  errorState: Ember.computed('error', 'value', '_wasFocused', '_forceShowError', '_forceHideError', function() {
    if (this.get('_forceHideError')) {
      return false;
    }

    const wasFocused = this.get('_wasFocused');
    const error = this.get('error');
    const forceShowError = this.get('_forceShowError');
    const previousErrorState = this.get('_previousErrorState');

    if (error && (wasFocused || previousErrorState || forceShowError)) {
      return this.set('_previousErrorState', {
        hasError: true,
        message: typeof error === 'string' ? error : null
      });

    } else {
      this.set('_previousErrorState', undefined);
    }

    return false;
  }),

  actions: {
    onFocusIn() {
      this.setProperties({
        '_wasFocused': false,
        'isFocused': true
      });
    },

    onFocusOut() {
      this.setProperties({
        '_wasFocused': true,
        'isFocused': false
      });
    },

    focusIn() {
      this.$().find('input:first').focus();
    }
  }
});
