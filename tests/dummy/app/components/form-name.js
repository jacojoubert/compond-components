import Ember from 'ember';
import FormComponent from './form-component';
import layout from '../templates/components/form-name';

export default FormComponent.extend({
  layout,

  hasValue: Ember.computed.or('firstName', 'middleName', 'lastName')
});
