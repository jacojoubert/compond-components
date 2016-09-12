import Ember from 'ember';
import layout from '../templates/components/cc-input';

export default Ember.Component.extend({
  layout,
  tagName: '',

  disabled: false,

  states: Ember.computed('disabled', 'errorState', function() {
    return {
      disabled: this.get('disabled'),
      error: this.get('errorState')
    };
  })
});
