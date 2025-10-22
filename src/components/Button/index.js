import { TouchableOpacity, Text } from "react-native";
import {style} from "./styles"

export function Button({variant = "primary" , onPress, currency}) {  return (
    <TouchableOpacity style={[
      style.button, 

      variant === "primary" ? 
      style.buttonPrimary
      :style.buttonSecondary
    ]}
    onPress={onPress}>  
      <Text style={style.buttonText}>
        {currency.code}
      </Text>
    </TouchableOpacity>
  )
}