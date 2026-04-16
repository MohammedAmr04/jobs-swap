import { useState, useCallback, useEffect } from "react";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";
import { Job } from "../components/JobCard";

const API_BASE_URL =
  Platform.OS === "android"
    ? "http://192.168.1.104:3000/api/jobs"
    : "http://localhost:3000/api/jobs";
const USER_ID = 1;

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  let isFetching = false;

  const fetchJobs = useCallback(async () => {
    if (isFetching) return;
    isFetching = true;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}?userId=${USER_ID}`);
      const result = await response.json();
      if (result.status === "success") {
        setJobs(result.data);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      Toast.show({
        type: "error",
        text1: "Connection Error",
        text2: "Couldn't connect to server",
      });
    } finally {
      setLoading(false);
      isFetching = false;
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const removeCardFromUI = useCallback((id: string | number) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  }, []);

  const handleApply = useCallback(
    async (job: Job) => {
      try {
        const response = await fetch(`${API_BASE_URL}/apply`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: USER_ID, jobId: job.id }),
        });
        const resData = await response.json();

        if (response.ok) {
          Toast.show({ type: "success", text1: "Applied! ", text2: job.title });
        } else {
          Toast.show({ type: "info", text1: "Note", text2: resData.message });
        }
      } catch (err) {
        console.log("Apply error", err);
      }
      removeCardFromUI(job.id);
    },
    [removeCardFromUI],
  );

  const handleIgnore = useCallback(
    async (job: Job) => {
      try {
        await fetch(`${API_BASE_URL}/ignore`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: USER_ID, jobId: job.id }),
        });
        Toast.show({ type: "error", text1: "Ignored ", text2: job.company });
      } catch (err) {
        console.log("Ignore error", err);
      }
      removeCardFromUI(job.id);
    },
    [removeCardFromUI],
  );

  return {
    jobs,
    loading,
    fetchJobs,
    handleApply,
    handleIgnore,
  };
};
