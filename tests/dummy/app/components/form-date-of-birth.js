import FieldKit from "npm:field-kit";
import DateOfBirthFormatter from "../utilities/date-of-birth-formatter";
import FormComponent from './form-component';
import layout from '../templates/components/form-date-of-birth';

export default FormComponent.extend({
  layout,

  didInsertElement() {
    const field = new FieldKit.TextField(this.$().find('input')[0],
                    new DateOfBirthFormatter());
    field.setFocusedPlaceholder('YYYY-MM-DD');
    field.setUnfocusedPlaceholder('YYYY-MM-DD');
  },

  value: undefined,

  error: Ember.computed('value', function() {
    if (!this.get('value')) {
      return "You must enter an date of birth."
    }
  })
});
