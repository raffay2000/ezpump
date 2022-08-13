import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import Slide from '../assets/animation/Slide';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import { isReadyRef, navigationRef } from '../navigation';
import { AuthContext } from '../context';
import { getItem } from '../persist-storage';
import { useDispatch } from 'react-redux';
import { PUT_USER_DATA } from '../redux/AppConstants';
import { StatusBar } from 'expo-status-bar';
import { white } from '../assets/colors';
import AuthScreen from '../Screens/AuthScreen';

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
                        {isLoggedIn
                            ?
                                <Stack.Screen options={{ cardStyleInterpolator: Slide }} name="MainRoutes" component={MainRoutes}/>   
                            :
                                <Stack.Screen name="AuthRoutes" component={Auth}/>
                        } 
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthContext.Provider>
        </>
    )
}
export default Routes;