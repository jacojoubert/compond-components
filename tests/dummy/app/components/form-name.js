import Ember from 'ember';
import FormComponent from './form-component';
import layout from '../templates/components/form-name';

export default FormComponent.extend({
  layout,

  hasValue: Ember.computed.or('firstName', 'middleName', 'lastName'),

  firstName: undefined,
  middleName: undefined,
  lastName: undefined,

  isInvalidFirstName: Ember.computed('firstName', function() {
    if (!this.get('firstName')) {
      return "You must enter a first name."
    }
  }),

  isInvalidLastName: Ember.computed('lastName', function() {
    if (!this.get('lastName')) {
      return "You must enter a last name."
    }
  }),

  value: Ember.computed('firstName', 'middleName', 'lastName', function() {
    const firstName = (this.get('firstName') || '');
    const middleName = (this.get('middleName') || '');
    const lastName = (this.get('lastName') || '');

    return `${firstName} ${middleName} ${lastName}`.trim();
  }),

  error: Ember.computed.or('isInvalidFirstName', 'isInvalidLastName')
});
