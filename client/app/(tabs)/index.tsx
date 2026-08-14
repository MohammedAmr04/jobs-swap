import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
} from "react-native";
import Toast from "react-native-toast-message";
import JobCard from "../../components/JobCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useJobs } from "../../hooks/useJobs";

const HomeScreen: React.FC = () => {
  const { jobs, loading, handleApply, handleIgnore } = useJobs();

  return (
    <GestureHandlerRootView style={styles.container}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : jobs.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyTitle}>{"You're all caught up"}</Text>
          <Text style={styles.emptySubtitle}>
            No more jobs to swipe. Pull to refresh to check again.
          </Text>
        </View>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingVertical: 20 }}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          refreshing={loading}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              onSwipeRight={() => handleApply(item)}
              onSwipeLeft={() => handleIgnore(item)}
            />
          )}
        />
      )}
      <Toast />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
  },
});

export default HomeScreen;
