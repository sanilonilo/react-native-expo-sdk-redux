import React, { useEffect, useState,useRef } from 'react'
import {View,Image,Text,StyleSheet, Dimensions, Button, TouchableOpacity, ScrollView} from 'react-native'
import axios from 'axios'
import {baseUrl} from '../config/constantes'
import mensagem from '../config/msgs'


const itemPesquisa = props => {
    
    const [comprado,setComprado] = useState(false)
    const isMounted = useRef(null)

    useEffect(() => {
        isMounted.current = true

        return () => isMounted.current = false
    })

    const comprar = id => {
        if(!id) return

        const filme = {id}
        axios.post(`${baseUrl}/comprar`,filme)
            .then(res => {
                
                if(isMounted.current) {
                    setComprado(true)
                    mensagem('Sucesso','Compra realizada com sucesso !','success')
                }
            })
            .catch(() => {})
        
    } 

    return(
        <View style={style.container}>
            <Image source={{uri:props.urlCapa}} style={style.img}/>

            <View style={style.info}>
                <ScrollView>
                    <Text style={style.title}>{props.nome}</Text>
                    <Text style={style.descricao}>{props.descricao}</Text>
                </ScrollView>

                <View style={{alignItems:'center'}}>
                    <TouchableOpacity
                    disabled={comprado ? true : false}
                    onPress={() => comprar(props.id)} 
                    style={!comprado ? style.btn : style.btnComprado}>
                        <Text style={!comprado ? style.btnTxt : style.btnTxtComprado}>{!comprado ? 'Comprar' : 'Comprado'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>

    )
}

const style = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').width/1.8,
        backgroundColor:'rgb(22,22,22)',
        marginBottom:15,
        padding:10,
        flexDirection:'row'
    },

    info:{
        marginLeft:20,
        height:'100%',
        justifyContent:'space-between'
    },
    img:{
        width:140,
        height:'100%'
    },

    title:{
        fontWeight:'bold',
        color:'#fff',
        fontSize:13,
        marginBottom:10,
        width:Dimensions.get('window').width - 180
    },

    descricao:{
        fontWeight:'bold',
        color:'rgb(180,180,180)',
        textAlign:'justify',
        fontSize:12,
        marginBottom:10,
        width:Dimensions.get('window').width - 180
    },

    btn:{
        width:90,
        marginTop:10,
        justifyContent:'center',
        borderRadius:15,
        borderWidth:1,
        padding:3,
        borderColor:'rgb(21, 158, 189)',
        alignItems:'center'
    },

    btnTxt:{
        fontSize:12,
        color:'rgb(21, 158, 189)',
        fontWeight:'bold',
        
    },

    btnComprado:{
        width:100,
        marginTop:10,
        justifyContent:'center',
        borderRadius:15,
        backgroundColor:'rgb(91, 145, 89)',
        padding:3,
        alignItems:'center'
    },

    btnTxtComprado:{
        fontSize:12,
        color:'#fff',
        fontWeight:'bold',
        
    }



})

export default itemPesquisa