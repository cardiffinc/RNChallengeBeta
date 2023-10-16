import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify'
import RadioButton from '../../atoms/RadioButton'
import UserListItem from '../../atoms/UserListItem'
import { LIST_USERS, FILTER_USERS_BY_ROLE } from '../../grapql/queries/UserQueries'

interface HomeScreenProps {
  navigation: any
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [errors, setErrors] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([]) 
  const [selectedType, setSelectedType] = useState<string>('All')
  const [loading, setLoading] = useState<boolean>(false)

  async function fetchData() {
    setLoading(true)
    try {
      const response = selectedType === 'All'
        ? await API.graphql(graphqlOperation(LIST_USERS))
        : await API.graphql(graphqlOperation(FILTER_USERS_BY_ROLE, { role: selectedType.toUpperCase() }))
      if (response.errors) {
        setErrors(response.errors.map((error: any) => error.message))
      } else {
        setUsers(response?.data?.listZellerCustomers.items)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Error fetching data:', error)
      setErrors([error.message])
    }
  }

  const handleTypeSelection = (type: string) => {
    setSelectedType(type)
  }

  useEffect(() => {
    setErrors([])
    fetchData()
  }, [selectedType])

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Type</Text>
      <View style={styles.childContainer}>
        <RadioButton title='Admin' selected={selectedType === 'Admin'} onPress={() => handleTypeSelection('Admin')} />
        <RadioButton title='Manager' selected={selectedType === 'Manager'} onPress={() => handleTypeSelection('Manager')} />
        <RadioButton title='All' selected={selectedType === 'All'} onPress={() => handleTypeSelection('All')} />
      </View>
      {selectedType ?
        <View>
          <Text style={styles.heading}>{selectedType} Users</Text>
          {loading ? <View style={styles.childContainer}>
            <Text style={{ color: '#000' }}>Loading...</Text>
          </View> :
            users?.length === 0 ? <View style={styles.childContainer}>
              <Text style={{ color: '#000' }}>Oops, No users found!</Text>
            </View> :
              errors?.length > 0 ?
                <View style={styles.childContainer}>
                  <Text style={{ color: '#000' }}>Oops, Something went wrong!</Text>
                </View> :
                <FlatList
                  data={users}
                  renderItem={({ item }) => <UserListItem name={item.name} key={item.name} role={item.role} />}
                  keyExtractor={item => item.id}
                />}
        </View> : <View style={styles.childContainer}>
          <Text style={{ color: '#000' }}>Select a type to view users</Text>
        </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    color: '#000',
    paddingHorizontal: 20,
    height: '100%',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: '#000',
  },
  childContainer: {
    marginBottom: 20,
  },
})

export default HomeScreen