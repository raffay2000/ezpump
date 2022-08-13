import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppHeader from '../../ScreenComponent/AppHeader';

const JobType1 = () => {
  return (
    <View>
      <AppHeader 
                    Heading={"REQUESTS TYPE"}
                    notification
                    borderRadius
                />
      <Text style={styles.Heading}>Job Requests</Text>
    </View>
  )
}

export default JobType1