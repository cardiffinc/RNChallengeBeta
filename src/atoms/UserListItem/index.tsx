import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface UserListItemProps {
  name: string;
  role: string;
}

const UserListItem: React.FC<UserListItemProps> = ({ name, role }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://ui-avatars.com/api/?name=${name[0]}&background=0370ce&color=fff`,
        }}
        style={styles.avatar}
      />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  role: {
    fontSize: 14,
    color: '#c6c6c6',
  },
});

export default UserListItem;