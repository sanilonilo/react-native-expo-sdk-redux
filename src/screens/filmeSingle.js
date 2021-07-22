import React, { useEffect, useRef, useState } from 'react'
import {View,StyleSheet,Text,TouchableOpacity, Dimensions} from 'react-native'
import {Video} from 'expo-av'
import Icon from '@expo/vector-icons/FontAwesome'


const filme = props => {
    
    const [status,setStatus] = useState({})
   
    const video = useRef(null)

    useEffect(() => {
        
        return  () => video.current.unloadAsync()
    },[])


    return(
        <View style={style.container}>
            <View style={style.info}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Icon
                     color="#fff"
                     size={25}
                     name="arrow-circle-left"/>
                </TouchableOpacity>
                <Text style={style.title}>Filme - <Text style={[style.title,style.destaque]}>{props.route.params.dados.nome}</Text></Text>
            </View>
            <Video
            style={style.video}
            source={{uri: `${props.route.params.dados.urlFilme}`}}
            ref={video}
            resizeMode="cover"
            useNativeControls
             />
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        position:'relative',
        backgroundColor:'#000',
        alignItems:'center',
        justifyContent:'center'
    },

    video:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height/3,
        position:'absolute',
        zIndex:99
        
    },

    info:{
        width:'100%',
        padding:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        position:'absolute',
        zIndex:999,
        top:20,
        left:0  
    },

    title:{
        fontSize:14,
        color:'rgb(200,200,200)',
        fontWeight:'bold',
        letterSpacing:2,
        marginLeft:22
    },
    destaque:{
        color:'rgb(21, 158, 189)'
    }

    

})

export default filme