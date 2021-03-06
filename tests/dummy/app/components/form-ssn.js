import Ember from 'ember';
import FieldKit from "npm:field-kit";
import FormComponent from './form-component';
import layout from '../templates/components/form-ssn';

export default FormComponent.extend({
  layout,

  didInsertElement() {
    const field = new FieldKit.TextField(this.$().find('input')[0],
                    new FieldKit.SocialSecurityNumberFormatter());
    field.setFocusedPlaceholder('___-__-____');
    field.setUnfocusedPlaceholder('___-__-____');
  },

  value: undefined,

  error: Ember.computed('value', function() {
    if (!this.get('value')) {
      return "You must enter your SSN.";
    }
  })
});
