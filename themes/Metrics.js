import { Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");

const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  itemHeight: 50,
  itemDetailHeight: 100
};

export default metrics;
