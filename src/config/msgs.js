import Toast from 'react-native-toast-message'

export const mensagem = (text1,text2,type) => {
    if(text2 && text2.response && text2.response.data){
        Toast.show({
            type,
            text1,
            text2:`${text2.response.data}`
        })
    }
    
    else if(type === 'error'){
        Toast.show({
            type,
            text1,
            text2:'Ocorreu um erro inesperado.'
        })
    }

    else{
        Toast.show({
            type,
            text1,
            text2
        })
    }
}

export default mensagem 