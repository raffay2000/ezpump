import React, {Component} from "react";
import { StatusBar } from "react-native";
import Auth_Route from "./source/Routes/Auth_Route"
import SplashScreen from "react-native-splash-screen";
import stores from "./source/Redux/store/redux_store";
import {Provider} from "react-redux";
import { primary } from "./source/assets/colors";

export default class App extends Component{

  componentDidMount(){
    SplashScreen.hide()
  }

  render(){
    return(
      <>
          <StatusBar backgroundColor={primary} />
          <Provider store={stores} >
              <Auth_Route />
          </Provider>
      </>
    );
  }
}
