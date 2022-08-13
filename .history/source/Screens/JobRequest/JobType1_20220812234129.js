import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppHeader from '../../ScreenComponent/AppHeader';

const JobType1 = () => {
  return (
    <View>
      <AppHeader 
        Heading={"JOB TYPE's"}
        BorRadius={true}
        IsBack={true}
        style={{zIndex:1}} 
        IsDisable={true}
      />
      <Text>JobType1</Text>
    </View>
  )
}

export default JobType1

const styles = StyleSheet.create({})