import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { moderateScale, verticalScale, horizontalScale } from '../../utils/responsive';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/profile-picture.png')}
            style={styles.profileImage}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.greetingText}>Welcome back!</Text>
            <Text style={styles.nameText}>Arvyno Wijaya</Text>
          </View>
        </View>
      </View>

      {/* Tutor Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionTitle}>LetsCoding Tutor</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllButton}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Image
              source={require('../../assets/tutor1.jpg')} // Replace with actual image path
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Marketing & Business</Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require('../../assets/tutor2.jpg')} // Replace with actual image path
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Photography & Video</Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require('../../assets/tutor3.jpg')} // Replace with actual image path
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Web & App Design</Text>
          </View>
        </View>
      </View>

      {/* Recommended Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Recommended</Text>
        <View style={styles.recommendationContainer}>
          <TouchableOpacity
            style={styles.recommendationCard}
            onPress={() => navigation.navigate('Learn')}
          >
            <Image
              source={require('../../assets/oop.jpg')} // Replace with actual image path
              style={styles.recommendationImage}
            />
            <Text style={styles.recommendationTitle}>Object Oriented Programming</Text>
            <Text style={styles.recommendationDescription}>
              Learn about object, inheritance, and all of basic OOP all at once
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.recommendationCard}
            onPress={() => navigation.navigate('Learn')}
          >
            <Image
              source={require('../../assets/python.jpg')} // Replace with actual image path
              style={styles.recommendationImage}
            />
            <Text style={styles.recommendationTitle}>Python Fundamental</Text>
            <Text style={styles.recommendationDescription}>
              Help to understand python fundamental such as functions, looping, and types
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Coming Soon Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Coming Soon Course</Text>
        <View style={styles.comingSoonContainer}>
          <View style={styles.comingSoonCard}>
            <Text style={styles.comingSoonTitle}>Blender Training Courses - Full Lifetime Access</Text>
            <View style={styles.progressBarBackground}>
              <View style={styles.progressBarFill} />
            </View>
            <TouchableOpacity
              style={styles.comingSoonButton}
              onPress={() => navigation.navigate('Learn')}
            >
              <Text style={styles.comingSoonButtonText}>Coming soon</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.comingSoonCard}>
            <Text style={styles.comingSoonTitle}>Interaction Design Founda— Figma Course</Text>
            <View style={styles.progressBarBackground}>
              <View style={styles.progressBarFill} />
            </View>
            <TouchableOpacity
              style={styles.comingSoonButton}
              onPress={() => navigation.navigate('Learn')}
            >
              <Text style={styles.comingSoonButtonText}>Coming Soon</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(18),
  },
  headerContainer: {
    marginTop: verticalScale(20), 
    marginBottom: verticalScale(10),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: horizontalScale(50),
    height: verticalScale(50),
    borderRadius: 25,
  },
  headerTextContainer: {
    marginLeft: horizontalScale(16),
  },
  greetingText: {
    fontSize: moderateScale(16),
    color: '#555',
  },
  nameText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginTop: verticalScale(5), // Added marginTop for each section
    marginBottom: verticalScale(24),
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  viewAllButton: {
    fontSize: moderateScale(14),
    color: '#6C63FF',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: (width - 64) / 3,
    backgroundColor: '#FFF',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: verticalScale(80),
  },
  cardText: {
    marginTop: verticalScale(8),
    fontSize: moderateScale(12),
  },
  recommendationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recommendationCard: {
    width: (width - 48) / 2,
    backgroundColor: '#FFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  recommendationImage: {
    width: '100%',
    height: verticalScale(100),
  },
  recommendationTitle: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    margin: moderateScale(8),
  },
  recommendationDescription: {
    fontSize: moderateScale(12),
    color: '#555',
    marginHorizontal: moderateScale(8),
    marginBottom: moderateScale(8),
  },
  comingSoonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comingSoonCard: {
    width: (width - 48) / 2,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: moderateScale(12),
    marginTop: verticalScale(20), // Added marginTop for "Coming Soon" cards
  },
  comingSoonTitle: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    marginBottom: moderateScale(8),
  },
  progressBarBackground: {
    height: verticalScale(8),
    backgroundColor: '#ddd',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: moderateScale(8),
  },
  progressBarFill: {
    width: '50%',
    height: '100%',
    backgroundColor: '#4D2C5E',
  },
  comingSoonButton: {
    backgroundColor: '#4D2C5E',
    borderRadius: 4,
    paddingVertical: verticalScale(8),
    alignItems: 'center',
  },
  comingSoonButtonText: {
    color: '#FFF',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
});


