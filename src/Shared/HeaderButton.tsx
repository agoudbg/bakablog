import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {
  HeaderButton,
  HeaderButtonProps,
} from "react-navigation-header-buttons";

export const MaterialHeaderButton = (props: HeaderButtonProps) => (
  // the `props` here come from <Item ... />
  // you may access them and pass something else to `HeaderButton` if you like
  <HeaderButton IconComponent={MaterialIcon} iconSize={23} {...props} />
);
