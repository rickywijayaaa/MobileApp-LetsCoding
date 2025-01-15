import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { auth } from '../../../services/firebase/config';
import { signOut } from 'firebase/auth';

const { width, height } = Dimensions.get('window');

const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Image Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../../../assets/profile-picture.png')} // Replace with your profile picture
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Image
            source={require('../../../assets/edit-icon.jpg')} // Replace with your edit icon
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>

      {/* User Info Section */}
      <Text style={styles.nameText}>Arvyno Wijaya</Text>
      <Text style={styles.emailText}>arvynowijaya@gmail.com</Text>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>36</Text>
          <Text style={styles.statLabel}>Completed Courses</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>01/01/2025</Text>
          <Text style={styles.statLabel}>Member Since</Text>
        </View>
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center', // Centers content vertically
    paddingVertical: height * 0.05,
  },
  profileSection: {
    position: 'relative',
    marginBottom: height * 0.05, // Increased margin to push items slightly downward
  },
  profileImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: (width * 0.4) / 2,
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 5,
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  emailText: {
    fontSize: 16,
    color: '#666',
    marginBottom: height * 0.05, // Increased margin for spacing
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginBottom: height * 0.05,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#DDD',
    marginHorizontal: 20,
  },
  signOutButton: {
    backgroundColor: '#4D2C5E',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: height * 0.05,
  },
  signOutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
