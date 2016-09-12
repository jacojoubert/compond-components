import Ember from 'ember';
import FormComponent from './form-component';
import layout from '../templates/components/form-address';

export default FormComponent.extend({
  layout,
  
  hasValue: Ember.computed.or('street', 'suite', 'zip', 'city', 'state')
});
