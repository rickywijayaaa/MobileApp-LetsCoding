// src/screens/main/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutUser } from '../../store/slices/authSlice';
import { selectCompletedCoursesCount } from '../../store/slices/progressSlice';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { moderateScale, verticalScale } from '../../utils/responsive';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get('window');

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const completedCoursesCount = useAppSelector(selectCompletedCoursesCount);
  const user = useAppSelector(state => state.auth.user);

  // Format the member since date
  const formatMemberSince = (timestamp: string | null) => {
    if (!timestamp) return 'N/A';
    
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  // Get the formatted member since date, handling undefined case
  const memberSince = formatMemberSince(user?.createdAt || null);

  const handleSignOut = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      // Navigation will be handled automatically by the auth state change
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Image Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/profile-picture.png')}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Image
            source={require('../../assets/edit-icon.jpg')}
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>

      {/* User Info Section */}
      <Text style={styles.nameText}>{user?.displayName || 'User'}</Text>
      <Text style={styles.emailText}>{user?.email || 'No email'}</Text>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{completedCoursesCount}</Text>
          <Text style={styles.statLabel}>Completed Courses</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{memberSince}</Text>
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
    backgroundColor: theme.colors.background.default,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(20),
  },
  profileSection: {
    position: 'relative',
    marginBottom: verticalScale(20),
  },
  profileImage: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(60),
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.background.paper,
    borderRadius: moderateScale(20),
    padding: moderateScale(5),
  },
  iconImage: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  nameText: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
  },
  emailText: {
    fontSize: moderateScale(16),
    color: theme.colors.text.secondary,
    marginBottom: verticalScale(20),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginBottom: verticalScale(20),
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
  },
  statLabel: {
    fontSize: moderateScale(14),
    color: theme.colors.text.secondary,
  },
  divider: {
    width: 1,
    height: verticalScale(40),
    backgroundColor: theme.colors.grey[300],
    marginHorizontal: moderateScale(20),
  },
  signOutButton: {
    backgroundColor: theme.colors.primary.main,
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(15),
    paddingHorizontal: moderateScale(40),
    marginBottom: verticalScale(20),
  },
  signOutText: {
    color: theme.colors.primary.contrast,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});

export default ProfileScreen;