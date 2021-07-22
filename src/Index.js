import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import NavStack from './NavStack'

const index = props => {
    return(
        <NavigationContainer>
            <NavStack/>
        </NavigationContainer>
    )
}

export default index