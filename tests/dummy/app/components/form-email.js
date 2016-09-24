import Ember from 'ember';
import FormComponent from './form-component';
import layout from '../templates/components/form-email';

export default FormComponent.extend({
  layout,

  value: undefined,

  error: Ember.computed('value', function() {
    if (!this.get('value')) {
      return "You must enter an email address.";
    }
  })
});
