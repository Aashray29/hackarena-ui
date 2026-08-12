import { apiClient } from "./apiClient";

interface RegistrationRecord {
  registration_id: number;
  user_id: number;
  hackathon_id: number;
  registration_date: string;
  name?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  registration_deadline?: string;
  team_size_min?: number;
  team_size_max?: number;
  status?: string;
}

interface RegistrationResponse {
  success: boolean;
  count?: number;
  data: RegistrationRecord[];
}

export const registrationService = {
  async register(hackathonId: number) {
    return apiClient.post("/registrations", {
      hackathon_id: hackathonId,
    });
  },

  async cancel(registrationId: number) {
    return apiClient.delete(`/registrations/${registrationId}`);
  },

  async getMyRegistrations(): Promise<RegistrationResponse> {
    return apiClient.get<RegistrationResponse>("/registrations/my");
  },
};

export type { RegistrationRecord, RegistrationResponse };
