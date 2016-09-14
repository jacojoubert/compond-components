import FieldKit from "npm:field-kit";
import FormComponent from './form-component';
import layout from '../templates/components/form-date-of-birth';

export default FormComponent.extend({
  layout,

  didInsertElement() {
    // TODO Create custom date formatter
    const field = new FieldKit.TextField(this.$().find('input')[0],
                    new FieldKit.ExpiryDateFormatter());
    field.setFocusedPlaceholder('__-__');
    field.setUnfocusedPlaceholder('__-__');
  },

  value: undefined,

  error: Ember.computed('value', function() {
    if (!this.get('value')) {
      return "You must enter an date of birth."
    }
  })
});
