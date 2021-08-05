 import React,{useEffect, useState} from 'react';
 import {StyleSheet, ScrollView} from 'react-native';
import {
  Text,
  List,
  ListItem,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Checkbox,
  Title,
  H1,
  Fab,
  subtitle,
  Container,
  Spinner,
  Form,
  Input,
  Item,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';


const Edit = (navigation, route) => {

  const [name, setName] = useState('')
  const [totalNoSeason, setTotalNoSeason] = useState('')
  const [id, setid] = useState(null)

  const update = async () => {
    try {
      if (!name || totalNoSeason) {
        return alert("Please enter value in both the fields")
        //TODO: add a snackbar here
      }
      const seasontoUpdate = {
        id,
        name,
        totalNoSeason,
        isWatched: false,
      }

      const storedValue = await AsyncStorage.getItem('@season_list')
      const list = await JSON.parse(storedValue)
      list.map((singelSeason) => {
        if (singleSeason.id == id) {
          singleSeason.name = Name
          singelSeason.totalNoSeason = totalNoSeason
        }
        return singleSeason;
      })
      await AsyncStorage.setItem('@season_list', JSON.stringify(list))
      
      navigation.navigate("Home")
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const { season } = route.params
    const { id, name, totalNoSeason } = season
    setId(id)
    setName(name)
    setTotalNoSeason(totalNoSeason)
  }, [])
  

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <H1 styles={styles.heading}>Add to watch list </H1>
        <Form>
          <Item rounded style={styles.formItem}>
            <Input
              placeholder="Series Name"
              style={{color: '#eee'}}
              value={name}
              onChangeText={text => setName(text)}
            />
          </Item>
          <Item rounded style={styles.formItem}>
            <Input
              placeholder="Total No of Season"
              style={{color: '#eee'}}
              valu={totalNoSeason}
              onChangeText={text => setTotalNoSeason(text)}
            />
          </Item>
          <Button rounded Block onPress={update}>
            <Text style={{color: '#eee'}}>Update</Text>
          </Button>
        </Form>
      </ScrollView>
    </Container>
  );
 
};

export default Edit;
 


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
  },
});