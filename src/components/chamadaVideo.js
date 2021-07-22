import React,{useState,useEffect,useRef} from 'react'
import { View,Text,StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Video, AVPlaybackStatus } from 'expo-av'
import Icon from '@expo/vector-icons/FontAwesome'


const trailer = props => {

    const video = useRef(null)
    const carregado = useRef(null)
    const [status,setStatus] = useState({})
    const [mudo,setMudo] = useState(true)

    useEffect(() => { 
        carregado.current = true

        return () => {
            video.current.unloadAsync()
            carregado.current = false
        }
    },[])

    useEffect(() => {
        
        props.navigation.addListener('blur', () => {
            if(carregado.current) video.current.pauseAsync()
        })
        props.navigation.addListener('focus', () => {
            if(carregado.current) video.current.playAsync()
        })

        return () => {
            props.navigation.removeListener('blur')
            props.navigation.removeListener('focus')
            
        }
    },[props.navigation])
    
    return (
       <View style={style.container}>
           <View style={style.overlay}></View>
           
           <Video
            ref={video}
            source={{uri:props.url}}
            style={style.video}
            resizeMode="cover"
            isLooping
            onLoad={() => video.current.playAsync()}
            isMuted={mudo}
            onPlaybackStatusUpdate={estado => setStatus(() => estado)}
            />
            
        
            <TouchableOpacity
                onPress={() => setMudo(!mudo)}
                style={style.btnMudo}>

                <Icon 
                    name={!mudo ? 'volume-up' : 'volume-off'}
                    size={22}
                    color="#fff"
                />
            </TouchableOpacity>
        
       </View> 
    )
}

const style = StyleSheet.create({
    container:{
        width:'100%',
        height:Dimensions.get('window').width-120,
        position:'relative'
    },

    overlay:{
        width:'100%',
        height:'100%',
        position:'absolute',
        zIndex:9,
        backgroundColor:'rgba(0,0,0,0.44)',
        
    },

    btnMudo:{
        position:'absolute',
        right:5,
        bottom:5,
        width:33,
        alignItems:'center',
        justifyContent:'center',
        zIndex:99
    },

    video:{
        width:'100%',
        height:'100%'
    },

   
})

export default trailer