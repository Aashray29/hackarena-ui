import { t as delay } from "./apiClient-BtcmMcAb.mjs";
import { n as currentTeam, r as mockTeams } from "./mockTeams-BOxUyN8I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teamService-CqLqbVM5.js
var teamService = {
	list() {
		return mockTeams;
	},
	getMyTeam() {
		return currentTeam;
	},
	getById(id) {
		return mockTeams.find((t) => t.id === id);
	},
	create(payload) {
		return delay({
			ok: true,
			payload
		});
	},
	join(code) {
		return delay({
			ok: true,
			code
		});
	},
	invite(email) {
		return delay({
			ok: true,
			email
		});
	},
	leave(teamId) {
		return delay({
			ok: true,
			teamId
		});
	},
	requestToJoin(teamId) {
		return delay({
			ok: true,
			teamId
		});
	},
	remove(teamId) {
		return delay({
			ok: true,
			teamId
		});
	}
};
//#endregion
export { teamService as t };
