import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export interface Job {
  id: number | string;
  title: string;
  company: string;
  description: string;
}

interface JobCardProps {
  job: Job;
  onSwipeLeft: (job: Job) => void;
  onSwipeRight: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onSwipeLeft, onSwipeRight }) => {
  const translateX = useSharedValue(0);

  const gesture = Gesture.Pan()
    .activeOffsetX([-15, 15]) // Allows vertical scroll (Y-axis) to pass to FlatList when scrolling up/down
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withSpring(SCREEN_WIDTH, {}, () => {
          runOnJS(onSwipeRight)(job);
        });
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withSpring(-SCREEN_WIDTH, {}, () => {
          runOnJS(onSwipeLeft)(job);
        });
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <Text style={styles.company}>{job.company}</Text>
          <Text style={styles.title}>{job.title}</Text>
          <Text style={styles.description}>{job.description}</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  card: {
    width: SCREEN_WIDTH * 0.9,
    minHeight: 200,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
  },
  company: {
    fontSize: 14,
    color: "#666",
    fontWeight: "bold",
    marginBottom: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#444",
  },
});

export default JobCard;
