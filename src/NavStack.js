import React,{useEffect, useState} from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {ActivityIndicator, View} from 'react-native'
import {connect} from 'react-redux'
import {validarToken} from './store/actions/auth'
import {keyStorage} from './config/constantes'

import RegistroOrLogin from './screens/registroOrLogin'
import Home from './screens/home'
import Pesquisa from './screens/pesquisa'
import FilmeSingle from './screens/filmeSingle'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Stack = createStackNavigator()

const NavStack = params => {

    const [carregado,setCarregado] = useState(false)
    
    const loading = async () => {
        const usuario = await AsyncStorage.getItem(keyStorage)
        params.validar(JSON.parse(usuario))
        
    }
    useEffect( () => {
        loading()

        let time = setTimeout(() => setCarregado(true),4000)
        
        return () => clearTimeout(time)
        
    },[])

    const renderizacao = () => {
        if(params.token_valido){
            axios.defaults.headers.common['Authorization'] = `bearer ${params.usuario.token}`
            return (
                <Stack.Navigator 
                    screenOptions={{headerShown: false}}
                    initialRouteName="Home">

            
                        <Stack.Screen name="Home">
                            {props => 
                                <Home {...props}/>
                            }
                        </Stack.Screen>

                        <Stack.Screen name="Pesquisa">
                            {props => 
                                <Pesquisa {...props}/>
                            }
                        </Stack.Screen>

                        <Stack.Screen name="FilmeSingle">
                            {props => 
                                <FilmeSingle {...props}/>
                            }
                        </Stack.Screen>
                </Stack.Navigator>
            )
        }

        else if(!params.token_valido && !params.usuario){
            
            return (
            <Stack.Navigator 
                screenOptions={{headerShown: false}}
                initialRouteName="RegistroOrLogin">

                <Stack.Screen name="RegistroOrLogin">
                    {props => 
                        <RegistroOrLogin {...props}/>
                    }
                </Stack.Screen>

            </Stack.Navigator>
            )
        }

        else {
            
            return false
        }
    }

    if(carregado) return renderizacao()
    
    else return (<View 
                style={{backgroundColor:'#000',flex:1,alignItems:'center',justifyContent:'center'}}><ActivityIndicator size={35} color="red"/></View>
                )
}


const mapStateToProps = ({auth}) => {
    return {
        usuario:auth.usuario,
        token_valido:auth.token_valido
    }
}

const mapDispatchToProps = dispatch => {
    return {
        validar: dadosStorage => dispatch(validarToken(dadosStorage))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(NavStack)