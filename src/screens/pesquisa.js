import React, { useState,useEffect, useRef } from 'react'
import {View,StyleSheet,Text, TouchableOpacity, TextInput, Dimensions, FlatList} from 'react-native'
import Icon from '@expo/vector-icons/FontAwesome'
import { Picker } from '@react-native-picker/picker'
import ItemPesquisa from '../components/itemPesquisa'
import axios from 'axios'
import {baseUrl} from '../config/constantes'
import Toast from 'react-native-toast-message'



const pesquisa = props => {

    const [filtro,setFiltro] = useState(null)
    const [resultado,setResultado] = useState(Array)
    const [filme,setFilme] = useState('')
    const isMounted = useRef(null)

    //const filtrarFilme = (a)

    const getPesquisa = () => {

        if(!filme.trim()) return setResultado([])

        setResultado([])
        axios.get(`${baseUrl}/pesquisas?pesquisa=${filme}`)
            .then(res => {
                if(isMounted.current && res.data && res.data.length > 0) {
                    setResultado(res.data)
                }
            })
            .catch(e => console.log)
    }

    

    useEffect(() => {
        isMounted.current = true
        getPesquisa()

        return () => isMounted.current = false
    },[filme])



    return(
        <View style={style.container}>
            <View style={style.header}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon
                     color="#fff"
                     size={25}
                     name="arrow-circle-left"/>
                </TouchableOpacity>
                <View style={style.boxPesquisa}>
                    <TextInput
                    value={filme}
                    onChangeText={filme => setFilme(filme)}
                    style={style.input}
                    placeholder="Search"
                    placeholderTextColor={'#000'}
                    />
                    <Icon
                     style={style.iconInterno}
                     name="search"
                     size={19}
                     color="#000"
                    />
                </View>
            </View>

            <View style={style.statusTop}>
                {resultado.length > 0 && <Text style={style.result}>Results</Text>}
            </View>

            <View style={style.lista}>
                <FlatList
                data={resultado}
                keyExtractor={item => `${item.id}`}
                renderItem={({item}) => <ItemPesquisa {...item}/>}
                />   
                
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000',
        paddingLeft:5,
        paddingRight:5
    },

    header:{
        paddingTop:33,
        alignItems:'center',
        backgroundColor:'rgb(15,15,15)',
        padding:10,
        paddingBottom:10,
        flexDirection:'row',
        justifyContent:'space-between'
    },

    input:{
        width:'100%',
        padding:7,
        paddingLeft:12,
        borderRadius:25,
        backgroundColor:'#fff',
        color:'#000',
        fontWeight:'bold'
    },

    boxPesquisa:{
        width:'85%',
        position:'relative'
    },

    boxSelect:{
        width:'40%',
        backgroundColor:'rgb(21, 158, 189)',
        borderRadius:22,
        padding:7
    },

    iconInterno:{
        position:'absolute',
        right:20,
        top:10

    },

    statusTop:{
        width:'100%',
        marginTop:13,
        padding:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },

    result:{
        fontWeight:'bold',
        fontSize:13,
        letterSpacing:2,
        color:'rgb(200,200,200)'
    },

    select:{
        width:'100%',
        color:'#000', 
    },

    item:{
        fontWeight:'bold',
        fontSize:13
    },

    lista:{
        flex:1,
        marginTop:13
    }
})

export default pesquisa

/*
    <View style={style.boxSelect}>
                    <Picker
                    style={style.select}
                    selectedValue={filtro}
                    onValueChange={(item,index) => setFiltro(item)}
                    >
                        <Picker.Item  style={style.item} label="Filtro" value='' enabled={true}/>
                        <Picker.Item  style={style.item} label="Ação" value={'acao'}/>
                        <Picker.Item  style={style.item} label="Romance" value={'romance'}/>
                        <Picker.Item  style={style.item} label="Comédia" value={'comedia'}/>
                    </Picker>
                </View>

*/