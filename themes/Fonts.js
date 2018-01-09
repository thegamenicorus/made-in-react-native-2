import { Platform } from "react-native";
import Colors from "./Colors";

const type = {
  base: Platform.OS === "ios" ? "Avenir-Book" : "Roboto"
};

const size = {
  extra: 40,
  large: 22,
  regular: 18,
  medium: 14,
  small: 12,
  tiny: 8
};

const style = {
  topic: {
    fontFamily: type.base,
    fontSize: size.large,
    color: Colors.text
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular,
    color: Colors.text
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium,
    color: Colors.disable
  },
  header: {
    fontFamily: type.base,
    fontSize: size.extra,
    fontWeight: "600",
    color: Colors.text
  }
};

export default {
  type,
  size,
  style
};
