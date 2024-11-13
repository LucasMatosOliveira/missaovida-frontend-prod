import { HTMLInputTypeAttribute, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { FormInfo } from '../FormInfo';
import { obterValor } from '@/commom/primitives/object';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { FormEye } from '../FormEye';
import { useAppFormContext } from '../hook';

export const FormInputMask = <TModel,>({ label, name, disabled, help, step = 'any', transform = 'none', type, mask }: FormInputMaskProps<TModel>) => {
  const context = useAppFormContext();
  const { control, formState: { errors }, getValues} = context;
  const erro = obterValor(errors, name as string);
  const erroMessage = erro ? (Array.isArray(erro) ? erro[0].message : erro.message) : null;

  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type || 'text');
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (inputType === 'password') {
      setIcon(eye);
      setInputType('text');
    } else {
      setIcon(eyeOff);
      setInputType('password');
    }
  };

  const handleValue = (value: string) => {
    switch (transform) {
      case 'uppercase':
        return value.toUpperCase();
      case 'lowercase':
        return value.toLowerCase();
      default:
        return value;
    }
  };

  return (
    <>
      <label className={disabled ? 'text-gray-400' : erroMessage ? 'text-danger' : ''}>{label}</label>
      {help && <FormInfo content={help} />}
      <Controller
        name={name as string}
        control={control}
        render={({ field: { value = '', onChange } }) => (
          <div className="relative">
            <InputMask
              mask={typeof mask === 'function' ? mask(value) : mask}
              value={value}
              onChange={(event) => onChange(handleValue(event.target.value))}
              disabled={disabled}
              className={`input-field ${erroMessage ? 'input-field-error' : ''}`}
            />
            {type === 'password' && <FormEye icon={icon} size={20} handleToggle={handleToggle} />}
          </div>
        )}
      />
      {/* <Controller
                name={name as string}
                control={control}
                render={({ field: { value = "", onChange } }) => (
                    <div className="relative">
                        <InputMask mask="(99) 99999-9999" alwaysShowMask={false}>
                            <input
                                disabled={disabled}
                                type={inputType}
                                value={value}
                                step={step}
                                onChange={(event) => onChange(handleValue(event.target.value))}
                                className={`input-field ${erroMessage ? 'input-field-error' : ''}`}
                            />
                        </InputMask>
                        {type === 'password' && (
                            <FormEye icon={icon} size={20} handleToggle={handleToggle} />
                        )}
                    </div>
                )}
            /> */}
      {erroMessage && <div className="error-message">{erroMessage}</div>}
    </>
  );
};

export interface FormInputMaskProps<TModel> {
  label?: string;
  mask: ((value: string) => string) | string;
  name: keyof TModel;
  type?: HTMLInputTypeAttribute;
  transform?: 'uppercase' | 'lowercase' | 'none';
  help?: string;
  disabled?: boolean;
  step?: string;
}
