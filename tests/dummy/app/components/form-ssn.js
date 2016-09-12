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
  }
});
