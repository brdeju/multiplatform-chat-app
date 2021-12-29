import { useController, useFormContext } from 'react-hook-form'
import { TextInputProps } from 'react-native';
import Input from '../Input'

type Props = {
  name: string;
  label?: string;
  defaultValue?: string;
  rules: object;
}
export default (props: TextInputProps & Props) => {
  const formContext = useFormContext();
  const { formState } = formContext;
  const {
    rules,
    defaultValue,
    ...inputProps
  } = props;
  const name = props.name;

  if (!formContext || !name) {
    const msg = !formContext ? "TextInput must be wrapped by the FormProvider" : "Name must be defined"
    console.error(msg)
    return null
  }

  const { field } = useController({ name, rules, defaultValue });

  return <Input
    {...inputProps}
    onChangeText={field.onChange}
    onBlur={field.onBlur}
    value={field.value}
    error={formState?.errors?.[name]?.message}
  />
}
