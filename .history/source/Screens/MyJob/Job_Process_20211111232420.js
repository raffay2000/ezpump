import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView
 } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import { White } from '../../ScreenComponent/color';
 import Job_Process from "../../ScreenComponent/MyJobsComponent/Job_Process_Component";

 export default class Job_Porcess extends Component{
     render() {
         return (
                <>
                    <AppHeader 
                        Heading={"FIND JOB"}
                        IsBack={true}
                        BorRadius={true}
                        Filter_press={true}
                        IsFilter={true}
                    />
                    <View style={styles.main}  >
                        <ScrollView>
                            <Job_Process 
                                heading={"Northan Concrete Pump"}
                                Duration={"Sat, 22, May"}
                                PostedBy={"Richard Davidson"}
                                Onpress={()=> alert("View Details In Progress")}
                            />

                            <Job_Process 
                                heading={"Northan Concrete Pump"}
                                Duration={"Sat, 22, May"}
                                PostedBy={"Richard Davidson"}
                                Onpress={()=> alert("View Details In Progress")}
                            />

                            <Job_Process 
                                heading={"Northan Concrete Pump"}
                                Duration={"Sat, 22, May"}
                                PostedBy={"Richard Davidson"}
                                Onpress={()=> alert("View Details In Progress")}
                            />

                            <Job_Process 
                                heading={"Northan Concrete Pump"}
                                Duration={"Sat, 22, May"}
                                PostedBy={"Richard Davidson"}
                                Onpress={()=> alert("View Details In Progress")}
                            />
                        </ScrollView>
                    </View>
                </>
         );
     }
 }

 const styles = StyleSheet.create({
     main:{
         flex:1,
         padding:hp("1.5%"),
         backgroundColor:White,
     }
 });