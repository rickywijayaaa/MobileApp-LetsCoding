// src/components/course/CourseCard.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Typography } from '../common/Typography/Typography';
import { theme } from '../../theme';

export interface CourseCardProps {
  title: string;
  description: string;
  studentCount: number;
  sectionCount: number;
  imageUrl: ImageSourcePropType;
  onPress: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  studentCount,
  sectionCount,
  imageUrl,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {imageUrl ? (
            <Image source={imageUrl} style={styles.courseImage} resizeMode="cover" />
          ) : (
            <View style={styles.gradientBox} />
          )}
        </View>
        <View style={styles.infoContainer}>
          <Typography variant="h3" style={styles.title}>
            {title}
          </Typography>
          <Typography variant="body2" color="secondary" style={styles.description}>
            Description: {description}
          </Typography>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Typography variant="h3">{studentCount}</Typography>
              <Typography variant="caption" color="secondary">
                Students
              </Typography>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Typography variant="h3">{sectionCount}</Typography>
              <Typography variant="caption" color="secondary">
                Sections
              </Typography>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: 21,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  content: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 31.5,
    overflow: 'hidden',
  },
  gradientBox: {
    flex: 1,
    backgroundColor: theme.colors.primary.main,
  },
  courseImage: {
    width: '100%',
    height: '100%',
    borderRadius: 31.5,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: theme.spacing.xs,
  },
  description: {
    marginBottom: theme.spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.grey[300],
    marginHorizontal: theme.spacing.md,
  },
});