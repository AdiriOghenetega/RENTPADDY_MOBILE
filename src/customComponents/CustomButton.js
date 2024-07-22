import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import colors from '../configs/colors'
import { AntDesign } from '@expo/vector-icons';

const CustomButton =({buttonLabel, onPress, icon,customStyle,customLabelStyle,customContainerStyle}) => {
  return (
    <View style={[styles.container,customContainerStyle]}>
      <TouchableOpacity 
          style={[styles.buttonContainer,customStyle]}
          onPress={onPress}
            
      >
          {icon && (
            <View style={styles.iconContainer}>
              {typeof icon === 'string' ? (
                <Image source={{ uri: icon }} style={styles.icon} />
              ) : (
                icon
              )}
            </View>
          )}
          <Text style={[styles.buttonText,customLabelStyle]}>
                  {buttonLabel}
          </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles =StyleSheet.create({

  container:{
      // marginBottom: 30,
      paddingLeft: 30,
      paddingRight: 30,
  },
  buttonContainer:{
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"center"
  },

  buttonText:{
    color: colors.white,
    fontFamily: "RalewayBold",
    fontSize: 18,
    textAlign: 'center'
  },

  iconContainer:{
    marginRight:10
  }


})
export default CustomButton;