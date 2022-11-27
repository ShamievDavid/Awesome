/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import History from './assets/svg/History.svg';

const fetchData = async () => {
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/any');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const App = () => {
  const [joke, setJoke] = useState({});
  const [liked, setLiked] = useState(false);
  const [isLoading, setLoading] = useState(true);
  console.log('just check!', joke);

  useEffect(() => {
    fetchData().then(res => {
      setJoke(res);
      setLoading(true);
    });
  }, []);

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionTitle}>
        <Text style={styles.title}>Today</Text>
      </View>
      {isLoading && (
        <View style={styles.jokeSection}>
          <Text style={styles.joke}>{joke?.setup}</Text>
          <Text style={styles.joke}>{joke?.delivery}</Text>
          {/* <View>
            <History width={24} heigth={24} />
          </View> */}
          {liked ? (
            <Text style={styles.like} onPress={() => setLiked(!liked)}>
              like
            </Text>
          ) : (
            <Text style={styles.like} onPress={() => setLiked(!liked)}>
              unlike
            </Text>
          )}
        </View>
      )}
      <View style={styles.sectionBottom}>
        <Text style={styles.today}>Today</Text>
        <Text style={styles.history}>History</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingTop: 108,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 24,
  },
  jokeSection: {
    paddingTop: 130,
  },
  joke: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: '600',
  },
  like: {
    marginTop: 10,
    color: 'red',
  },
  sectionBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 220,
    borderTopColor: 'black',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  today: {
    marginRight: 10,
    marginTop: 40,
  },
  history: {
    marginTop: 40,
  },
});

export default App;
