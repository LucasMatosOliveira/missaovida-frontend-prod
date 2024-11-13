export class Masks {

    public static CPF = "999.999.999-99"

    public static Celular = "(99) 99999-9999";

    public static Telefone = "(99) 9999-9999";

    public static ToggleTelefone(value: string) {
      return value.at(2) !== '9' && value.length > 10 ? Masks.Telefone : Masks.Celular;
    }

    public static removeMask(mask: string, value: string) {
      if (mask.length !== value.length) {
        return null;
      }
      let rawValue = '';
      for(let maskIndex = 0; maskIndex < mask.length; maskIndex++){
        if(mask[maskIndex] === '#'){
            rawValue += value[maskIndex];
        }
      }
      return rawValue;
    }
  }