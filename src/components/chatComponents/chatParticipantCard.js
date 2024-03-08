import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions,Modal } from 'react-native'
import React,{useState} from 'react'
import colors from '../../configs/colors'
import { globalStyles } from '../../styles/globalStyles'
import Chatbox from './chatbox'

const {width} = Dimensions.get("window")

export default function ChatParticipantCard({name, profileImage, lastMessage, unreadCount, time, messages}) {
const [openChatBox,setOpenChatBox]=useState(false)

const handleToogleModal = ()=>{
    setOpenChatBox(prev=>!prev)
}
  return (
    <TouchableOpacity style={[styles.container,globalStyles.shadowContainer]} onPress={handleToogleModal}>
        <Modal visible={openChatBox} >
       <Chatbox 
       handleToogleModal={handleToogleModal}
        currentUser={name}
        chat={messages}
        avatar={profileImage}
        name={name}
       />
        </Modal>
      <View style={styles.imageContainer}>
       <Image style={styles.image} source={{uri:profileImage}} />
       <View style={styles.dot}></View>
      </View>
      <View style={styles.detailsContainer}>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.timeText}>{time}</Text>
      </View>
      <View style={styles.lastMessageContainer}>
        <Text style={styles.lastMessage}>{lastMessage}</Text>
        <View style={styles.unreadContainer}>
            <Text style={styles.unreadText}>{unreadCount}</Text>
        </View>
      </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    flexDirection: 'row',
    padding: 15,
    marginVertical:10,
   borderRadius:10,
   borderColor:colors.lightgray,
   borderWidth:1
  },
  imageContainer:{
    width:"20%",
    justifyContent:"center",
    alignItems:"center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  dot:{
 position:"absolute",
 bottom:0,
 left:0
  },
  detailsContainer:{
 width:"80%",
 justifyContent:"space-between",
  },
  nameContainer:{
flexDirection:"row",
alignItems:"center",
justifyContent:"space-between"
  },
  nameText:{
 fontSize:16,
 fontWeight:"500"
  },
  timeText:{
    fontSize:12,
    color:colors.gray
  },
  lastMessageContainer:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  lastMessage:{
fontSize:12,
color:colors.gray
},
unreadContainer:{
width:25,
height:25,
borderRadius: 50,
backgroundColor:colors.secondary,
alignItems:"center",
justifyContent:"center",
},
unreadText:{
color:colors.white
}
})