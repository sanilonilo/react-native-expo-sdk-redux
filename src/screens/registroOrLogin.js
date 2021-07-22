import React,{useState,useEffect} from 'react'
import {View,Text,Image,TextInput,TouchableOpacity,StyleSheet, ScrollView} from 'react-native'
import Icon from '@expo/vector-icons/FontAwesome'
import {connect} from 'react-redux'
import {singin,signup} from '../store/actions/auth'
import Toast from 'react-native-toast-message'


const initial = {
    nome:'',
    username:'',
    email:'',
    senha:''
}
const logo = require('../../assets/logo-prime.png')


const registroOrLogin = props => {

    const [usuario,setUsuario] = useState({...initial})
    const [isLogin,setIsLogin] = useState(true)

    const entrar = () => props.onLogin(usuario)

    const registrar = () => props.onRegistrar(usuario) 

    return(
        <View style={style.container}>
            <Image source={logo} style={style.logo}/>
            <Text style={style.convite}>Sign in to Amazon Prime</Text>
            
            <View style={style.box}>
            <ScrollView
            style={style.scroll}
             contentContainerStyle={{width:'100%',alignItems:'center'}}>
            
                {!isLogin &&
                    <TextInput
                    onChangeText={nome => setUsuario({...usuario,nome})}
                    placeholderTextColor={'rgb(180,180,180)'}
                    style={style.input}
                    placeholder='Name'
                />
                }

                <TextInput
                    onChangeText={username => setUsuario({...usuario,username})}
                    placeholderTextColor={'rgb(180,180,180)'}
                    style={style.input}
                    placeholder='Username'
                />

                {!isLogin && 
                    <TextInput
                    onChangeText={email => setUsuario({...usuario,email})}
                    placeholderTextColor={'rgb(180,180,180)'}
                    style={style.input}
                    placeholder='Email'
                />
                }

                <TextInput
                    onChangeText={senha => setUsuario({...usuario,senha})}
                    placeholderTextColor={'rgb(180,180,180)'}
                    style={style.input}
                    placeholder='Senha'
                    secureTextEntry={true}
                />

            </ScrollView>
            </View>
            
            <View style={{alignItems:'center',justifyContent:'space-between'}}>
                <TouchableOpacity
                onPress={() => isLogin ? entrar() : registrar()}
                style={style.acao}>
                    <Text style={style.acaoTxt}>{isLogin ? 'Entrar' : 'Registrar'}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={() => setIsLogin(!isLogin)}
                style={style.modo}>
                    <Text style={style.modoTxt}>{isLogin ? 'Não tem conta ? Registre-se !' : 'Já possui conta ? Faça login .'}</Text>
                </TouchableOpacity>
            </View>
            
            <Text style={style.direitos}>Todos os direitos reservados - 2021</Text>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
    )
}

const style = StyleSheet.create({
    container:{
       flex:1,
       backgroundColor:'#000',
       paddingTop:33,
       padding:10,
       
    },

    logo:{
        width:110,
        height:35,
        marginBottom:50
    },

    box:{
        flex:1,
        alignItems:'center',
        marginBottom:13,
        marginTop:14
    },
    input:{
        width:'90%',
        padding:9,
        paddingLeft:10,
        backgroundColor:'rgb(40,40,40)',
        borderRadius:25,
        marginBottom:10,
        color:'rgb(222,222,222)',
        fontWeight:'bold',
        letterSpacing:2,
        fontSize:12

    },

    convite:{
        fontWeight:'bold',
        color:'#fff',
        marginBottom:10,
        marginLeft:4
    },

    acao:{
        width:110,
        padding:9,
        borderRadius:25,
        backgroundColor:'rgb(21, 158, 189)',
        alignItems:'center',
        marginBottom:22
    },

    acaoTxt:{
        fontWeight:'bold'  
    },

   

    modo:{
        width:250,
        
        alignItems:'center',
        padding:9,
        borderRadius:25,
       borderColor:'rgb(21, 158, 189)',
       borderWidth:1
    },

    modoTxt:{
        fontWeight:'bold',
       color:'rgb(21, 158, 189)'
    },

    scroll:{
        width:'100%',
        
    },

    direitos:{
        textAlign:'center',
        fontSize:12,
        marginTop:22,
        fontWeight:'bold',
        color:'rgb(90,90,90)'
    }



})

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch(singin(user)),
        onRegistrar: user => dispatch(signup(user))
    }
}

export default connect(null,mapDispatchToProps)(registroOrLogin)