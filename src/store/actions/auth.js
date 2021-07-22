import {USUARIO_VALIDADO,TOKEN_VALIDADO} from './actionTypes'
import axios from 'axios'
import {baseUrl,keyStorage} from '../../config/constantes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import mensagem from '../../config/msgs'

export const singin = (dados) => { 
    return submit(dados,`${baseUrl}/singin`)
}

export const signup = (dados) => {
    return submit(dados,`${baseUrl}/signup`,true)
}

export const update = (dados) => {
    return dispatch => {
        axios.put(`${baseUrl}/usuario`,dados)
            .then(() => {
                mensagem('Sucesso','Usuário artualizado .','success')
            })
            .catch(e => {
                mensagem('Erro',e,'error')
            })
    }
}

export const loggout = () => {
    return async dispatch => {
        await AsyncStorage.removeItem(keyStorage)
        dispatch({
            type:TOKEN_VALIDADO,
            payload: {
                usuario:null,
                token:false
            }
        })
    }
}

export const deletarConta = () => {
    return dispatch => {
        axios.delete(`${baseUrl}/usuario`)
            .then(async () => {
                await AsyncStorage.removeItem(keyStorage)
                    dispatch({
                        type:TOKEN_VALIDADO,
                        payload: {
                            usuario:null,
                            token:false
                        }
                    })
            })
            .catch(e => {
                mensagem('Erro',e,'error')
            })
    }
}

export const validarToken = (dadosStorage) => {
    return async dispatch => {
        if(dadosStorage){
            axios.post(`${baseUrl}/validar`,dadosStorage)
             .then(async res => {
                 
                 if(res.data){
                    
                     dispatch({
                         type:TOKEN_VALIDADO,
                         payload: {
                             usuario:dadosStorage,
                             token:true
                         }
                        })//true
                 }

                 else{
                    
                     await AsyncStorage.removeItem(keyStorage)

                     dispatch({
                        type:TOKEN_VALIDADO,
                        payload: {
                            usuario:null,
                            token:false
                        }
                        })
                 }
             })
             .catch(async e => {
                
                await AsyncStorage.removeItem(keyStorage)
                
                dispatch({
                        type:TOKEN_VALIDADO,
                        payload: {
                            usuario:null,
                            token:false
                        }
                })
             })
         }

        else{
            await AsyncStorage.removeItem(keyStorage)
            dispatch({
                    type:TOKEN_VALIDADO,
                    payload: {
                        usuario:null,
                        token:false
                    }
            })
        }
    }
}

const submit = (dados,url,novaConta=false) => {
    return dispatch => {
        axios.post(url,dados)
            .then(async res => {

                await AsyncStorage.setItem(keyStorage, JSON.stringify(res.data))

                if(!novaConta) {
                    dispatch({type:USUARIO_VALIDADO,payload:res.data})
                }
                    
                else{
                    mensagem('Sucesso','Usuário cadastrado com sucesso .','success')
                }
                //faça algo para informar q foi cadastrado
            })
            .catch(e => {
                mensagem('Erro',e,'error')
            })
    }
} 

export default {
    validarToken,
    signup,
    singin,
    deletarConta,
    update
}