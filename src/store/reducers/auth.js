import {USUARIO_VALIDADO,TOKEN_VALIDADO} from '../actions/actionTypes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {keyStorage} from '../../config/constantes'


const initial = {
    usuario: null,
    token_valido:false
}


export const reducer = (state=initial,action) => {
    switch(action.type){

        case TOKEN_VALIDADO:
            if(action.payload.token){
                return {...state,usuario:action.payload.usuario,token_valido:true}
            }
            else{
                return {usuario:null,token_valido:false}
            }
        
        case USUARIO_VALIDADO:
           return {...state,usuario:action.payload,token_valido:true}
        
        default: return state   

    }
}

export default reducer