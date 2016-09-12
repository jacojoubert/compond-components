import Ember from 'ember';
import layout from '../templates/components/cc-fieldset';

export default Ember.Component.extend({
  layout,
  tagName: '',

  focus: false,

  size: 'medium',

  classes: Ember.computed('class', 'size', function() {
    return {
      class: this.get('class'),
      size: `cc-font-size--${this.get('size')}`
    };
  }),

  states: Ember.computed('focus', function() {
    return {
      focus: this.get('focus')
    };
  }),

  actions: {
    onFocusIn() {
      this.set('focus', true);
    },

    onFocusOut() {
      this.set('focus', false);
    }
  }
});
