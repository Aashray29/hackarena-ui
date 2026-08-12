import { i as mockLeaderboard, r as mockEvaluations } from "./mockEvaluations-Ukch97-E.mjs";
import { t as delay } from "./apiClient-BtcmMcAb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/evaluationService-Dw10SHPB.js
var evaluationService = {
	list() {
		return mockEvaluations;
	},
	getBySubmission(submissionId) {
		return mockEvaluations.find((e) => e.submissionId === submissionId);
	},
	leaderboard() {
		return mockLeaderboard;
	},
	submit(payload) {
		return delay({
			ok: true,
			payload
		});
	},
	assign(payload) {
		return delay({
			ok: true,
			payload
		});
	}
};
//#endregion
export { evaluationService as t };
