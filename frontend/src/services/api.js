import axios from "axios";

// Pastikan Backend berjalan di port 3000
const API_BASE_URL = "http://localhost:3000/api";

export const processFile = async (formData, onUploadProgress) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/process`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob", // Wajib blob agar bisa download PDF
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (onUploadProgress) onUploadProgress(percentCompleted);
      },
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? await error.response.data.text()
      : new Error("Server Error / Backend Mati");
  }
};
