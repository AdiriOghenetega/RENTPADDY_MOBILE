import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React,{useState} from 'react'
import colors from '../../configs/colors'
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AcceptRentalModal({toogleModal,property,renter}) {

    const [date, setDate] = useState({
        starts : new Date(),
        expires : new Date()
    });
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(prev=>{
        return {
            ...prev,
            starts : currentDate
        }
      });
    };

    const onChangeDateExpiry = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow2(false);
      setDate(prev=>{
        return {
            ...prev,
            expires : currentDate
        }
      });
    };
  
    const showDatepickerRentStart = () => {
        setShow(true);
        setMode('date');
    };

    const showDatepickerRentExpire = () => {
      setShow2(true);
      setMode('date');
    };
  

  return (
    <SafeAreaView style={styles.container}>
   <TouchableOpacity
        onPress={toogleModal}
        style={styles.topSubContainer}
      ></TouchableOpacity>
       <KeyboardAvoidingView behavior="padding" style={styles.secondContainer}>
       <View style={styles.subContainer}>
        <Text style={styles.title}>Provide the information below to proceed</Text>
        <View>
        <View style={styles.selectedDateContainer}>
            <View style={styles.selectedDate}>
         <Text style={styles.selectedDateLabelText}>Rent starts on : </Text>
         <Text style={styles.selectedDateText}>{date.starts.toLocaleString()}</Text>
            </View>
         <TouchableOpacity onPress={showDatepickerRentStart}><Text style={styles.changeDateText}>Change</Text></TouchableOpacity>
        </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date.starts}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
        </View>
        <View>
        <View style={styles.selectedDateContainer}>
            <View style={styles.selectedDate}>
         <Text style={styles.selectedDateLabelText}>Rent expires on : </Text>
         <Text style={styles.selectedDateText}>{date.expires.toLocaleString()}</Text>
            </View>
         <TouchableOpacity onPress={showDatepickerRentExpire}><Text style={styles.changeDateText}>Change</Text></TouchableOpacity>
        </View>
      {show2 && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date.expires}
          mode={mode}
          is24Hour={true}
          onChange={onChangeDateExpiry}
        />
      )}
        </View>
        </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      },
      topSubContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      subContainer: {
       backgroundColor: colors.white,
        padding: 15,
        borderRadius: 10,
        margin: 10,
        flex: 1,
        gap: 10,
      },
      secondContainer: {
        height: "75%",
      },
      title:{
        textAlign:"center",
        fontSize:16,
        marginVertical:10
      },
      selectedDateContainer:{
        flexDirection : "row",
        alignItems:"center",
        justifyContent:"space-between"
      },
      selectedDate:{
        flexDirection : "row",
        alignItems:"center",
        justifyContent:"space-between"
      },
      selectedDateLabelText:{
       fontSize : 15,
       fontWeight:"bold"
      },
      selectedDateText:{
      color:colors.gray
      },
      changeDateText:{
      color:colors.secondary
      }
})