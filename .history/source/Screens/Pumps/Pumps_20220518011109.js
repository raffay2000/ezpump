import React, { Component } from 'react';
import { 
    View,
    Text,
    FlatList,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
 } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../ScreenComponent/AppHeader';
import Entypo from "react-native-vector-icons/Entypo";
import PumpComponent from '../../ScreenComponent/Pump_Component/PumpComponent';
import { bold } from '../../assets/fonts';
import { primary, secondary, white } from '../../assets/colors';
import { connect } from 'react-redux';
import ErrorMessage from '../../ScreenComponent/common/ErrorMessage';
import { loadPumps } from '../../Redux/Action/PumpAction';
import PumpCard from '../../ScreenComponent/Pump_Component/PumpCard';

class Pumps extends Component{

    componentDidMount() {
        this.props.loadPumps();
        // console.log(this.props.pumps.length)
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.forceUpdate();
        });
    }
    componentWillUnmount() {
        this._unsubscribe();
    }
    onAddPumpPress = () => {
        this.props.navigation.navigate("AddEditPump", {id: 0}) // true for adding pump
    }
    onPumpPress = (id, pump) => () => {
        // return alert(id)
        this.props.navigation.navigate("AddEditPump", {pump, id}) // false for editing pump
    }
    renderItem(item){
        const {loading, failed, pumps} = this.props;
        if(loading){
            return <ActivityIndicator style={{padding: hp('10%')}} size={"large"} color={secondary} />
        }
        if(failed){
            return <ErrorMessage text={"Couldn't Load Pumps"}/>
        }
        return (
            <PumpCard
                name={item.name}
                pump={item.pump_type.type_name}
                job={item.job_type.type_name}
                state={item.state}
                onPress={this.onPumpPress(item.id, item)}
            />
        )
    }
    render(){
        const {loading, failed, pumps} = this.props;
        return(
            <>
                <AppHeader 
                    Heading={"PUMPS"}
                    borderRadius={true}
                />
                <View style={styles.main} >
                   
                    {/* <View style={{width:"95%", alignSelf:"center", height:hp("0.05%"), backgroundColor:primary, marginTop:hp("3%")}} /> */}
                           
                            
                                <FlatList   
                                    data={pumps}
                                    showsVerticalScrollIndicator={false}
                                    ListHeaderComponent={()=>
                                        <View>
                                        <Text style={styles.Txt} > Add new pump </Text>
                                        <TouchableOpacity activeOpacity={0.8} style={styles.Add} onPress={this.onAddPumpPress}>
                                            <Entypo name="plus" color={secondary} size={hp("5%")} />
                                        </TouchableOpacity>
                                        </View>
                                    }
                                    renderItem={({item})=>
                                        this.renderItem(item)
                                    }
                                />  
                        
                    <View style={{height:hp("5%")}} />
                </View>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.pumpReducer.loading,
        pumps : state.pumpReducer.pumps,
        failed : state.pumpReducer.failed,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        loadPumps: ()=>dispatch(loadPumps()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pumps)


const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:"#EEEEEE",
        paddingBottom: 0,
        padding:hp("1.5%"),
        paddingVertical:0
    },
    Txt:{
        fontSize:hp("1.5%"),
        fontFamily:bold,
        lineHeight:hp("1.8%"),
        color:"#979797",
        letterSpacing:0.5,
        alignSelf:"center",
        margin:hp("4%")
    },
    Add:{
        width:50,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:100,
        backgroundColor:white,
        shadowColor:"#00000029",
        shadowRadius:6,
        elevation:6,
        // marginTop:hp("2%"),
        alignSelf:"center"
    }
 });