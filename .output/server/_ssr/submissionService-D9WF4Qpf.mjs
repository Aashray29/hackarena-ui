import { t as mockSubmissions } from "./mockSubmissions-CPu4gVLm.mjs";
import { t as delay } from "./apiClient-BtcmMcAb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/submissionService-D9WF4Qpf.js
var submissionService = {
	list() {
		return mockSubmissions;
	},
	getById(id) {
		return mockSubmissions.find((s) => s.id === id);
	},
	listByJudge(_judgeId) {
		return mockSubmissions;
	},
	submit(payload) {
		return delay({
			ok: true,
			payload
		});
	}
};
//#endregion
export { submissionService as t };
