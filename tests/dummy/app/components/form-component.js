import Ember from 'ember';

export default Ember.Component.extend({
  error: false,
  displayError: 'auto',

  _forceShowError: Ember.computed.equal('displayError', 'always'),
  _forceHideError: Ember.computed.equal('displayError', 'never'),

  isFocused: false,
  _wasFocused: false,
  _previousErrorState: undefined,

  errorState: Ember.computed('error', 'value', '_wasFocused', 'isFocused', '_forceShowError', '_forceHideError', function() {
    if (this.get('_forceHideError')) {
      return false;
    }

    const isFocused = this.get('isFocused');
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

  focusIn() {
    this.setProperties({
      '_wasFocused': false,
      'isFocused': true
    });
  },

  focusOut(event) {
    // The delay ensures that when the user move to next input that input has received
    // focus before we handle the focusOut event.
    Ember.run.later(this, () => {

      // Only consider the component unfocused if the current activeElement isn't a child
      // of the component.
      if (!this.$().find(document.activeElement).length) {
        this.setProperties({
          '_wasFocused': true,
          'isFocused': false
        });
      }

    }, 10);
  },

  actions: {
    focusIn() {
      this.$().find('input:first').focus();
    }
  }
});
