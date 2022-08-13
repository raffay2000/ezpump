import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import Slide from '../assets/animation/Slide';
import { isReadyRef, navigationRef } from '../navigation';
import { AuthContext } from '../context';
import { getItem } from '../persist-storage';
import { useDispatch } from 'react-redux';
import { PUT_USER_DATA } from '../Redux/Constants';
import AuthScreen from '../Screens/AuthScreen';
import AppRoutes from './App_Route';
import AuthRoute from './Auth_Route';

const Stack = createStackNavigator();

const Routes = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(null)

    const dispatch = useDispatch();

    useEffect(()=>{
        checkToken();
    },[])

    const checkToken = async () => {
        getItem('user').then((user)=>{
            if(user){
                setIsLoggedIn(true);
                dispatch({
                    type: PUT_USER_DATA, 
                    payload: JSON.parse(user)
                })
            }else{
                setIsLoggedIn(false);
            }
        });
    }

    if(isLoggedIn === null){
        return <AuthScreen/>
    }

    return(
        <>
            {/* <StatusBar backgroundColor={white} style="dark"/> */}
            <AuthContext.Provider value={{updateState:checkToken}}>
                <NavigationContainer 
                    // theme={{colors:{background:'white'}}}
                    ref={navigationRef}
                    onReady={() => {
                        isReadyRef.current = true;
                    }}
                >
                    <Stack.Navigator screenOptions={{headerShown:false}}>
                        {!isLoggedIn
                            ?
                                <Stack.Screen options={{ cardStyleInterpolator: Slide }} name="MainRoutes" component={AppRoutes}/>   
                            :
                                <Stack.Screen name="AuthRoutes" component={AuthRoute}/>
                        } 
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthContext.Provider>
        </>
    )
}
export default Routes;