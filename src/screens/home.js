import React,{useState,useEffect,useRef} from 'react'
import {View,Text,Image,StyleSheet, TouchableOpacity, Dimensions,FlatList, ScrollView, Button} from 'react-native'
import Icon from '@expo/vector-icons/FontAwesome'
import Trailer from '../components/chamadaVideo'
import { Modalize } from 'react-native-modalize'
import axios from 'axios'
import {baseUrl} from '../config/constantes'
import {connect} from 'react-redux'
import {loggout} from '../store/actions/auth'

const home = props => {

    const [filmes,setfilmes] = useState(Array)
    const [categorias,setCategorias] = useState(null)
    const modalizeRef = useRef(null)
    const [pagina,setPagina] = useState(1)
    const [categoria,setCategoria] = useState(null)
    const isMounted = useRef(null)
    const [destaque,setDestaque] = useState(null)
    

    const openModal = () => {
        modalizeRef.current.open()
    }

    const getCategorias = () => {
        axios.get(`${baseUrl}/categoria`)
            .then(res => {
                if(isMounted.current) setCategorias(res.data.data)
            })
            .catch(() => {})
    } 

    

    

    const filtrarFilmes = arr => {
        
        if(pagina === 1) setfilmes(arr)
        
        if(pagina > 1 && filmes.length !== 0){
            
            let novoArray = filmes.map(item => {
                let amount = arr.length
                let filme = null
                
                for(let i = 0; i <= amount; i++){
                    
                    if(item.id !== arr[i].id) filme = {...item}
                    
                    return filme
                }
                 
            })

            setfilmes([...novoArray,...arr])
            
        }
    }

   const getFilmes = () => {
       const url = categoria && categoria !== 'all' ? `${baseUrl}/filmes?pagina=${pagina}&categoria=${categoria}` : `${baseUrl}/filmes?pagina=${pagina}`

        axios.get(url)
            .then(res => {  
                if(isMounted.current) {
                    if(res.data.quantidade > filmes.length) setPagina(pagina + 1)
                
                    filtrarFilmes(res.data.data)
                } 
            })
            .catch(() => {})
   }

   const getDestaque = () => {
       axios.get(`${baseUrl}/destaque`)
            .then(res => {
                if(isMounted.current) setDestaque(res.data.urlTrailer)
            })
            .catch(() => {})
   }

   

    const homeInicial = () => {
        if(isMounted.current) {
            setPagina(1) 
            setCategoria('all')
                 
        }
    }

    const clickCategoria =  id => {
        if(isMounted.current){
            setPagina(1)
            setCategoria(id)
        }
    }

    useEffect(() => {
        setPagina(1)
        getFilmes()

    },[categoria])


    useEffect(() => { 
    isMounted.current = true
       getCategorias()
       getDestaque()
        return () => {
            modalizeRef.current.close()
            isMounted.current = false
            
        }
    },[])



    return (
        
        <View style={style.container}>
            
            <View style={style.header}>
                <Image style={style.logo} source={require('../../assets/logo-prime.png')}/>
                <TouchableOpacity onPress={() => props.navigation.navigate('Pesquisa')}>
                    <Icon name="search" size={20} color="rgb(200,200,200)"/>
                </TouchableOpacity>
            </View>
            <View style={style.nav}>
                <FlatList
                horizontal={true}
                data={categorias}
                keyExtractor={item => `${item.id}`}
                renderItem={({item}) => 
                <TouchableOpacity
                onPress={() => clickCategoria(item.id)}
                style={[style.btnNav]}>
                    <Text style={[style.titleNav,item.id === categoria ? {color:'rgb(227, 39, 39)'} : null]}>{item.nome}</Text>
                </TouchableOpacity>
                }
                />
            </View>
            <ScrollView>
                <Text style={[style.avisos,style.destaque]}>Destaque</Text>
               
                <Trailer {...props} url={destaque}/>
                
                <Text style={[style.avisos,style.new]}>Seus filmes</Text>
                {!filmes || filmes.length === 0 ? <View style={style.semFilme}><Icon name='lock' size={70} color='rgba(40,40,40,0.77)'/></View> : null}
                    
                <View style={style.contentLista}>
                    <View style={style.listaBox}>
                            <FlatList
                            onEndReached={() => getFilmes()}
                            onEndReachedThreshold={0.01}
                            horizontal={true}
                            data={filmes}
                            keyExtractor={item => `${item.id}`}
                            renderItem={({item}) => 
                            <TouchableOpacity style={[style.listaFilmesBtn,style.listaFilmesBtnSelected]}
                             onPress={() => props.navigation.navigate('FilmeSingle',{dados:{...item}})}>
                                <View style={style.boxSingleMy}>
                                    <View style={style.overlayFilmes}><Icon name='play-circle-o' size={55} color='rgba(21, 158, 189,0.5)'/></View>
                                    <Image source={{uri:item.urlCapa}} style={style.listaFilmesImg}/>
                                </View>
                                <Text style={style.nomeFilme}>{item.nome.substr(0,20)}</Text>
                            </TouchableOpacity>
                        }
                            />
                        </View>
                    
                </View>
                </ScrollView>
                <View style={style.boxBottom}>
                    <TouchableOpacity
                    onPress={() => homeInicial()}
                    style={[style.navBottom,style.navBottomDestaque]}>
                    <Icon name="home" color="#000" size={20}/>
                    <Text style={style.txtBtnBottom}>Home</Text> 
                    </TouchableOpacity>

                    <TouchableOpacity style={style.navBottom} onPress={openModal}>
                        <Icon name="heart-o" color="rgba(21, 158, 189,0.5)" size={20}/> 
                    </TouchableOpacity>

                    <TouchableOpacity style={style.navBottom}>
                        <Icon name="cog" color="rgba(21, 158, 189,0.5)" size={20}/> 
                    </TouchableOpacity>

                </View>
            
            
            <Modalize 
                modalHeight={parseInt(Dimensions.get('window').height - 120)}
                rootStyle={style.modalExterno}
                modalStyle={style.modalInterno}
                ref={modalizeRef}
                
            >
                <Button
                title="Sair"
                width={100}
                onPress={() => props.onSair()}/>
            </Modalize>

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

    logo:{
        width:90,
        height:25
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

    title:{
        fontSize:23,
        color:'rgb(244,244,244)',
        fontWeight:'bold',
        letterSpacing:2
    },

    titleDestaque:{
        color:'rgb(21, 158, 189)'
    },

    nav:{
        padding:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:5,
        

    },

    btnNav:{
        marginRight:13
    },

    titleNav:{
        fontSize:9,
        color:'#000',
        fontWeight:'bold',
        letterSpacing:2,
        padding:4,
        paddingLeft:8,
        paddingRight:8,
        backgroundColor:'#fff',
        borderRadius:15
    },

    content:{
        alignItems:'center'

    },

    btnChamadaImg:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height/3.4,      
        position:'relative',
    
    },

    overlay:{
        width:'100%',
        height:'100%',
        position:'absolute',
        zIndex:99,
        backgroundColor:'rgba(0,0,0,0.3)',
    },

    chamadaImg:{
       width:'100%',
       height:'100%',
       position:'absolute'
    },

    contentLista:{
       
    },

    listaBox:{
        marginBottom:8
    },

    listaFilmesBtnSelected:{
        
    },

    listaFilmesBtn:{
        width:130,
        height:160,
        marginRight:30,
        marginBottom:20,
        alignItems: 'center'
    },

    boxSingleMy: {
        width:120,
        height:140,
        position:'relative',
        marginBottom:8,

    },

    overlayFilmes:{
        width:'100%',
        height:'100%',
        position:'absolute',
        zIndex:99,
        backgroundColor:'rgba(0,0,0,0.5)',
        alignItems:'center',
        justifyContent:'center'
    },

    listaFilmesImg:{
        width:'100%',
        height:'100%',
        zIndex:9,
        
        position:'absolute'
        
    },

    nomeFilme:{
        fontSize:10,
        fontWeight:'bold',
        letterSpacing:1,
        color:'#fff',
        marginBottom:10
    },

    avisos:{
        fontSize:11,
        textAlign:'center',
        marginBottom:10,
        padding:5,
        marginTop:10,
        borderRadius:15,
        letterSpacing:2,
        color:'rgb(112, 53, 64)',
        borderColor:'rgb(112, 53, 64)',
        borderWidth:1
    }, 
    emAlta:{
        
    },
    new:{
       width:120,
       marginBottom:20,
    },

    destaque: {
       width:120,
       
    },

    boxBottom:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:7,
        marginTop:7
    },

    navBottom:{
        flex:3,
        alignItems:'center'
    },
    navBottomDestaque:{
        flex:4,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        padding:7,
        backgroundColor:'rgba(21, 158, 189,0.5)',
        borderRadius:20,
        borderWidth:1,
        
    },
    txtBtnBottom:{
        fontWeight:'bold',
        fontSize:14,
        marginLeft:6,
        
    },

    modalInterno:{
        backgroundColor:'rgb(30,30,30)',
        paddingTop:20,
        padding:10
    },

    modalExterno:{
        backgroundColor:'rgba(0,0,0,0.3)'
    },

    semFilme:{
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        height:150
    }



    
})

const mapDispatchToProps = dispatch => {
    return {
        onSair: () => dispatch(loggout())
    }
}
export default connect(null,mapDispatchToProps)(home)