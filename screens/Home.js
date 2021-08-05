import React, {useState, useEffect} from 'react';
import {  StyleSheet, ScrollView } from 'react-native';

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
  Spinner
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { State } from 'react-native-gesture-handler';
import { useIsFocused} from '@react-navigation/native';


const Home = ({ navigation, route }) => {
  const [listOfSeason, setListOfSeason] = useState([])
  const [loading, setloading] = useState(false)

  const isFocused = useIsFocused()

  const getList = async () => {
    setloading(true)

    const storedValue = await AsyncStorage.getItem('@season_list');
    if (!storedValue) {
      setListOfSeason([])
    }
    const list = JSON.parse(storedValue)
    setListOfSeason(list)
    setloading(false)
  }
  const deleteSeasons = async (id) => {
    const newList = await listOfSeason.filter((list) => list.id !== id)
    await AsyncStorage.setItem('@season_list', JSON.stringify(newList));

    setListOfSeason(newList)
  }
  const markComplete = async () => {
    const newArr = listOfSeason.map((list) => {
      if (list.id == id) {
        list.isWatched = !list.isWatched
      }
      return list 
    })

    await AsyncStorage.setItem('@season_list', JSON.stringify(newArr));
    setListOfSeason(newArr)
  }

  useEffect(() => {
    getList();
  }, [isFocused]);

 

  if (loading) {
    return (
      <Container sytle={styles.container}>
        <Spinner color="#00b7c2"/>
      </Container>
    )
  }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {listOfSeason.length == 0 ? (
          <Container style={styles.container}>
            <H1 style={styles.heading}>
              Watchlist is empty, Please add some seasons
            </H1>
          </Container>
        ) : (
          <>
            <H1>Next Season to watch</H1>
            <List>
              {listOfSeason.map(season => (
                <ListItem key={season.id} style={styles.ListItem} noBorder>
                  <Left>
                    <Button style={styles.actionButton} danger onPress={() => deleteSeasons(season.id)}>
                      <Icon name="trash" active />
                    </Button>
                    <Button style={styles.actionButton} onPress={() => {
                      navigation.navigate('Edit',{season})
                    }}>
                      <Icon active name="edit" type="Feather" />
                    </Button>
                  </Left>
                  <Body>
                    <Title sytle={styles.seasonName}>
                      {season.name}
                    </Title>
                    <Text note> { season.totalNoSeason}</Text>
                  </Body>
                  <Right>
                    <Checkbox
                      checked={season.isWatched}
                      onPress={() => markComplete(season.id)}
                    />
                  </Right>
                </ListItem>
              ))}
            </List>
          </>
        )}

        <Fab
          style={{backgroundColor: '#5067FF'}}
          position="bottonRight"
          onPress={() => navigation.navigate('Add')}>
          <Icon name="add" />
        </Fab>
      </ScrollView>
    );
};

export default Home;

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: '#fdcb9e',
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
  },
});