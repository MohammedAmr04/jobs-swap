import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Toast from "react-native-toast-message";
import JobCard from "../../components/JobCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useJobs } from "../../hooks/useJobs";

const HomeScreen: React.FC = () => {
  const { jobs, loading, handleApply, handleIgnore } = useJobs();

  return (
    <GestureHandlerRootView style={styles.container}>
      {jobs.length === 0 && loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingVertical: 20 }}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              onSwipeRight={() => handleApply(item)}
              onSwipeLeft={() => handleIgnore(item)}
            />
          )}
        />
      )}
      {jobs.length === 0 && !loading && (
        <View style={styles.noJobs}>
          <ActivityIndicator size="small" color="#007bff" />
        </View>
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
  noJobs: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
