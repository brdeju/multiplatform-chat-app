import styled from "styled-components/native";
import Colors, { ThemeProps } from "../../../constants/Colors";
import useColorScheme from "../../../hooks/useColorScheme";

type Props = {
  children: Element | string
}

const ErrorWrapper = styled.View`
  position: relative;
`;
const ErrorText = styled.Text`
  marginLeft: 35px;
  marginRight: 35px;
  font-size: 16px;
  color: ${(props: ThemeProps) => Colors[props.theme].error}
`

export default ({ children }: Props) => {
  const colorsSchema = useColorScheme();

  return (
    <ErrorWrapper>
      <ErrorText theme={colorsSchema}>{children}</ErrorText>
    </ErrorWrapper>
  )
}
