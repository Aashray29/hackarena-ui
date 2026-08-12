import { apiClient } from "./apiClient";

export const registrationService = {
  async register(hackathonId: number) {
    return apiClient.post("/registrations", {
      hackathon_id: hackathonId,
    });
  },

  async cancel(hackathonId: number) {
    return apiClient.delete(`/registrations/${hackathonId}`);
  },

  async getMyRegistrations() {
    return apiClient.get("/registrations/my");
  },
};