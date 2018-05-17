import React, {Component} from 'react'
import {View, Text, Button, StyleSheet, FlatList, Modal,TouchableOpacity,TouchableHighlight,Image,Linking} from 'react-native'
import {adminActivityStyle as styles, modalActivityStyle as modalStyles} from './styles' 
import { FontAwesome } from '@expo/vector-icons';

const ParticipantItem = ({participant,avatarUrl,phone}) => {
    return (
        <View style={modalStyles.participantItem}>
            {avatarUrl ?
            <TouchableHighlight>
                <Image style={styles.userImageList} source={{uri: avatarUrl}}/>
            </TouchableHighlight>
            :
            <FontAwesome style={styles.withoutImgList} name='user-circle' size={35}/>
            }
            <View style={{flex:1,flexDirection: 'row',justifyContent: 'space-between'}}>
                <Text style={{fontSize:18,flexDirection:'column',alignSelf:'center'}}>{participant.name}</Text>
                { phone ?
                <FontAwesome style={styles.phoneIcon} name='phone-square' size={35}
                    onPress={()=>{Linking.openURL('tel:'+phone)}}/>
                :
                <FontAwesome style={[styles.phoneIcon,{color:'grey'}]} name='phone-square' size={35}/>
                }
            </View>
        </View>)
}

class AdminActivity extends Component{
    state = {displayCancelEventDialog: false};
    
    showCancelEventDialog = () => 
        this.setState({displayCancelEventDialog: true})

    hideCancelEventDialog = () => 
        this.setState({displayCancelEventDialog: false});

    deleteActivity = (params) =>{
        //todo delete the event
        console.log('todo - come on - really delete the event')
        this.hideCancelEventDialog();
        this.props.navigation.goBack();
    }
    
    render() {
        const {params} = this.props.navigation.state
        const activity = params ? params.event : null
        const participants = params ? params.participants : null
        const avatarsArray = params ? params.avatarsArray : null
        const phonesArray = params? params.phonesArray : null
        return (
            <View style={styles.container}>
                <Text style={styles.h1}> התנדבות {activity.caption} </Text>
                <Text style={styles.h3}> בתאריך {activity.date} בשעה {activity.time} </Text>
                <Text style={styles.h2}> לפעילות זו
                    רשומים {participants ? participants.length : 0} מתנדבים </Text>
                <FlatList data={participants}
                          renderItem={({item,index}) => <ParticipantItem participant={item} avatarUrl={avatarsArray[index]} phone={phonesArray[index]}/>}
                          keyExtractor={(item) => item.appId}/>
                <TouchableHighlight onPress={this.showCancelEventDialog}>
                    <View style={styles.cancelButton}>
                        <Text style={styles.cancelText}>בטל התנדבות</Text>
                        <FontAwesome style={styles.cancelIcon} name='trash' size={30}/>
                    </View>
                </TouchableHighlight>
                <Modal
                    transparent
                    visible={this.state.displayCancelEventDialog}
                    animationType={'slide'}
                    onRequestClose={()=>{}}
                >
                    <View style={modalStyles.modalContainer}>
                        <View>
                            <Text style={[modalStyles.title,{color:'white'}]}> האם לבטל את ההתנדבות? {'\n'} </Text>
                            <TouchableOpacity
                                rounded
                                style={modalStyles.modalButton}
                                onPress={() => this.deleteActivity(params)}
                                >
                                <Text style={modalStyles.modalButtonText}>בטל התנדבות</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                rounded
                                style={[modalStyles.modalButton,{backgroundColor:'green'}]}
                                //onPress={() => { this.setState({cancelDialogVisible:false});}}
                                onPress={() => { this.hideCancelEventDialog()}}
                                >
                                <Text style={modalStyles.modalButtonText}>השאר התנדבות</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View>
        )
    }
}

export default AdminActivity