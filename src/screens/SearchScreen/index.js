import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Keyboard } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import UserListItem from '../../atoms/UserListItem';
import { SEARCH_USERS } from '../../grapql/queries/UserQueries';

function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errors, setErrors] = useState([])

  useEffect(() => {
    async function searchUsers() {
      try {
        const response = await API.graphql(
          graphqlOperation(SEARCH_USERS, { searchTerm })
        )
        if (response.errors) {
          console.error('Error:', response.errors);
          setErrors(response.errors)
        } else {
          const userList = response.data.listZellerCustomers.items;
          setSearchResults(userList);
        }
      } catch (error) {
        console.error('Error searching users:', error);
        setErrors([error])
      }
    }
    if (searchTerm && searchTerm !== '') {
      searchUsers();
    } else {
      Keyboard.dismiss()
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by name"
        placeholderTextColor={'#000'}
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <UserListItem name={item.name} role={item.role} />
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  input: {
    height: 40,
    borderColor: '#0370ce',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    color: '#000'
  },
});

export default SearchScreen;