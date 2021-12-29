import { TextInputProps } from 'react-native'
import styled from 'styled-components/native'
import Colors, { ThemeProps } from '../../../constants/Colors'
import useColorScheme from '../../../hooks/useColorScheme'

type InputProps = {
  error?: string;
  label?: string;
}

const Wrapper = styled.View`
  margin-bottom: 34px;
`;

const Label = styled.Text`
  color: ${(props: ThemeProps & { isError: boolean }) => (props.isError ? Colors[props.theme].error : Colors[props.theme].text)};
  font-size: 14px;
  letter-spacing: 2px;
  padding-bottom: 4px;
  padding-left: 4px;
`;

const Error = styled.Text`
  color: ${(props: ThemeProps) => Colors[props.theme].error};
  font-size: 16px;
  margin-top: 4px;
  margin-left: 4px;
  position: absolute;
  bottom: -20px;
`;

type StyledInputProps = TextInputProps & ThemeProps & { isError: boolean }
const StyledInput = styled.TextInput`
  border-color: ${(props: StyledInputProps) => (props.isError ? Colors[props.theme].error : Colors[props.theme].border)};
  border-width: 1px;
  border-radius: 6px;
  height: 40px;
  font-size: 16px;
  padding-left: 8px;
  background-color: ${(props: StyledInputProps) => Colors[props.theme].background};
`;

export default ({ label, error, ...textInputProps }: TextInputProps & InputProps) => {
  const colorsSchema = useColorScheme();

  const isError = Boolean(error)

  return (
    <Wrapper>
      {Boolean(label) && <Label isError={isError} theme={colorsSchema}>{label}</Label>}
      <StyledInput isError={isError} theme={colorsSchema} {...textInputProps} />
      {isError && <Error theme={colorsSchema}>{error}</Error>}
    </Wrapper>
  )
}
