import Ember from 'ember';
import FormComponent from './form-component';
import layout from '../templates/components/form-address';

export default FormComponent.extend({
  layout,

  hasValue: Ember.computed.or('street', 'suite', 'zip', 'city', 'state'),

  street: undefined,
  suite: undefined,
  zip: undefined,
  city: undefined,
  state: undefined,

  isInvalidStreet: Ember.computed('street', function() {
    if (!this.get('street')) {
      return "You must enter a street.";
    }
  }),

  isInvalidZip: Ember.computed('zip', function() {
    if (!this.get('zip')) {
      return "You must enter a zip code.";
    }
  }),

  isInvalidCity: Ember.computed('city', function() {
    if (!this.get('city')) {
      return "You must enter a city.";
    }
  }),

  isInvalidState: Ember.computed('state', function() {
    if (!this.get('state')) {
      return "You must enter a state.";
    }
  }),

  value: Ember.computed('street', 'zip', 'city', 'state', function() {
    const street = (this.get('street') || '');
    const zip = (this.get('zip') || '');
    const city = (this.get('city') || '');
    const state = (this.get('state') || '');

    return `${street} ${zip} ${city} ${state}`.trim();
  }),

  error: Ember.computed.or('isInvalidStreet', 'isInvalidZip', 'isInvalidCity', 'isInvalidState')
});
