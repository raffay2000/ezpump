import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppHeader from '../../ScreenComponent/AppHeader';

const JobType1 = () => {
  return (
    <View>
      <AppHeader 
                    Heading={"REQUESTS"}
                    notification
                    borderRadius
                />
      <Text>JobType1</Text>
    </View>
  )
}

export default JobType1

const styles = StyleSheet.create({})