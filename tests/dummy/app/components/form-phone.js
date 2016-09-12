import FieldKit from "npm:field-kit";
import FormComponent from './form-component';
import layout from '../templates/components/form-phone';

export default FormComponent.extend({
  layout,
  
  didInsertElement() {
    const field = new FieldKit.TextField(this.$().find('input')[0],
                    new FieldKit.PhoneFormatter());
    field.setFocusedPlaceholder('(___) ___-____');
    field.setUnfocusedPlaceholder('(___) ___-____');
  }
});
