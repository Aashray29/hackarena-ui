globalThis.__nitro_main__ = import.meta.url;
import { n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"ae-hLVBrSrDdpIw3Xl0dJPRkupPepQ\"",
		"mtime": "2026-08-11T10:02:50.462Z",
		"size": 174,
		"path": "../public/robots.txt"
	},
	"/assets/admin.hackathons-SkeU4uhN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1385-MJvqc9fMBARi6vQz8Y7OZ7hk9cw\"",
		"mtime": "2026-08-12T13:28:11.806Z",
		"size": 4997,
		"path": "../public/assets/admin.hackathons-SkeU4uhN.js"
	},
	"/assets/about-CVoG6ltw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"94e-gfw1dZNM/tjJ8zGdZb3XcREl5RE\"",
		"mtime": "2026-08-12T13:28:11.804Z",
		"size": 2382,
		"path": "../public/assets/about-CVoG6ltw.js"
	},
	"/assets/admin-BgXU7bOI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"565-02N3K/0JXFFKsG2ktNzGA6Bxhjw\"",
		"mtime": "2026-08-12T13:28:11.805Z",
		"size": 1381,
		"path": "../public/assets/admin-BgXU7bOI.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-08-11T10:02:50.461Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/admin.participants-Be0spnLL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cac-0xs2ilHGBiHddE6tnMZQXgrk3ec\"",
		"mtime": "2026-08-12T13:28:11.808Z",
		"size": 3244,
		"path": "../public/assets/admin.participants-Be0spnLL.js"
	},
	"/assets/admin.results-bDHN3Kf0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bd7-vbl6+0qYHvrcrsoG5W8pwW6KGk8\"",
		"mtime": "2026-08-12T13:28:11.809Z",
		"size": 3031,
		"path": "../public/assets/admin.results-bDHN3Kf0.js"
	},
	"/assets/admin.judges-BvMnQAkJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1372-Ek/TkPSU+WI+O0sU3cl3BaUARt8\"",
		"mtime": "2026-08-12T13:28:11.808Z",
		"size": 4978,
		"path": "../public/assets/admin.judges-BvMnQAkJ.js"
	},
	"/assets/admin.settings-BW1pWqVk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-bHdprHPo1qyyyPCbuxdd92TtdjI\"",
		"mtime": "2026-08-12T13:28:11.810Z",
		"size": 154,
		"path": "../public/assets/admin.settings-BW1pWqVk.js"
	},
	"/assets/admin.submissions-CBzQkpk6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a22-5s1JKAVH2IvSlSPnu+qeAg4ej+o\"",
		"mtime": "2026-08-12T13:28:11.811Z",
		"size": 2594,
		"path": "../public/assets/admin.submissions-CBzQkpk6.js"
	},
	"/assets/admin.teams-DEAXH3bm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bb9-Nhh6SNZu6CEql7k/xXZLyWnwmRE\"",
		"mtime": "2026-08-12T13:28:11.812Z",
		"size": 3001,
		"path": "../public/assets/admin.teams-DEAXH3bm.js"
	},
	"/assets/authService-CEPHuFnz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30d-ZzFFuvI5eAmaVMTQW782YPuvIcM\"",
		"mtime": "2026-08-12T13:28:11.816Z",
		"size": 781,
		"path": "../public/assets/authService-CEPHuFnz.js"
	},
	"/assets/apiClient-yMUavzoE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"51-rzTf4iSy0KJJmvw2hgDFq89DnA8\"",
		"mtime": "2026-08-12T13:28:11.813Z",
		"size": 81,
		"path": "../public/assets/apiClient-yMUavzoE.js"
	},
	"/assets/arrow-left-Bdt1PfM_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-OAnL6QD7AT9vzcxaMUWPl0904U0\"",
		"mtime": "2026-08-12T13:28:11.814Z",
		"size": 165,
		"path": "../public/assets/arrow-left-Bdt1PfM_.js"
	},
	"/assets/award-B-zYG6Wn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"112-PQcsNtJXTcvkugP76EORC74/m0o\"",
		"mtime": "2026-08-12T13:28:11.816Z",
		"size": 274,
		"path": "../public/assets/award-B-zYG6Wn.js"
	},
	"/assets/Avatar-wSBdqaBv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c2-AyVXjsls4XHpqCy3KHboAr/C784\"",
		"mtime": "2026-08-12T13:28:11.797Z",
		"size": 450,
		"path": "../public/assets/Avatar-wSBdqaBv.js"
	},
	"/assets/button-DA7jn4vj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"784-JwqVD8A6ui6IwbP+2vBJgibEHl4\"",
		"mtime": "2026-08-12T13:28:11.818Z",
		"size": 1924,
		"path": "../public/assets/button-DA7jn4vj.js"
	},
	"/assets/circle-check-DjOsU-2G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-mxVeUOMAM7J+cYmJuSZXlZLGF30\"",
		"mtime": "2026-08-12T13:28:11.819Z",
		"size": 178,
		"path": "../public/assets/circle-check-DjOsU-2G.js"
	},
	"/assets/admin.index-baSuooZS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"61094-C2sPFWGERQKZA56f3kr6uaIlbOs\"",
		"mtime": "2026-08-12T13:28:11.807Z",
		"size": 397460,
		"path": "../public/assets/admin.index-baSuooZS.js"
	},
	"/assets/arrow-right-D9dIjaq0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-yM1NPdm2VNUeU6YVaLlK1G74khg\"",
		"mtime": "2026-08-12T13:28:11.815Z",
		"size": 165,
		"path": "../public/assets/arrow-right-D9dIjaq0.js"
	},
	"/assets/calendar-days-D4bF78qH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-4sC9RtXyOO368IDp3zgzoGsf/Dc\"",
		"mtime": "2026-08-12T13:28:11.818Z",
		"size": 494,
		"path": "../public/assets/calendar-days-D4bF78qH.js"
	},
	"/assets/clipboard-list-BbxHhqXc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19b-mGqWBZwdfe5Y/eRsqcDtzueZe8E\"",
		"mtime": "2026-08-12T13:28:11.820Z",
		"size": 411,
		"path": "../public/assets/clipboard-list-BbxHhqXc.js"
	},
	"/assets/clock-BlNsxegI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-sP7vF0EnH3eG7O628KZVDC6szIk\"",
		"mtime": "2026-08-12T13:28:11.821Z",
		"size": 169,
		"path": "../public/assets/clock-BlNsxegI.js"
	},
	"/assets/createLucideIcon-CLdWFMku.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ab-rMBxsqcPKrcnF/JzamLtMRV6aPw\"",
		"mtime": "2026-08-12T13:28:11.823Z",
		"size": 1195,
		"path": "../public/assets/createLucideIcon-CLdWFMku.js"
	},
	"/assets/cloud-upload-sb964EDn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f7-s9C9/MkYqEl94ogYiLcNjEG/t38\"",
		"mtime": "2026-08-12T13:28:11.822Z",
		"size": 503,
		"path": "../public/assets/cloud-upload-sb964EDn.js"
	},
	"/assets/crown--sxbiSYR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16a-eaTiW2GDtbHnlOGdt19juovcnxM\"",
		"mtime": "2026-08-12T13:28:11.824Z",
		"size": 362,
		"path": "../public/assets/crown--sxbiSYR.js"
	},
	"/assets/DashboardLayout-DApaRXJI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10ac-o99dJBeb3CDGY/EjSMABOQ5n4Sg\"",
		"mtime": "2026-08-12T13:28:11.798Z",
		"size": 4268,
		"path": "../public/assets/DashboardLayout-DApaRXJI.js"
	},
	"/assets/dist-DonatgXG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b3c-rhiqsGaGDKNDHG2sYHoj65wvrHk\"",
		"mtime": "2026-08-12T13:28:11.827Z",
		"size": 2876,
		"path": "../public/assets/dist-DonatgXG.js"
	},
	"/assets/dist-Dh7IEhEn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a68-1ckfup2Ug5JF+xbc0p7RdlIN2oI\"",
		"mtime": "2026-08-12T13:28:11.826Z",
		"size": 2664,
		"path": "../public/assets/dist-Dh7IEhEn.js"
	},
	"/assets/dist-C_Q5Tgbm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6e1-YSfE1ZKXXbNgh5qvWOGgaQJuxDM\"",
		"mtime": "2026-08-12T13:28:11.825Z",
		"size": 1761,
		"path": "../public/assets/dist-C_Q5Tgbm.js"
	},
	"/assets/dist-kGsOPm_f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c3-0zm1BMAaY0N2NBgVJkBm1IVxE3Y\"",
		"mtime": "2026-08-12T13:28:11.828Z",
		"size": 707,
		"path": "../public/assets/dist-kGsOPm_f.js"
	},
	"/assets/dialog-BRI5snBN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a81-mRYLTZc0vIFIpnHH8JCCtH3qpy8\"",
		"mtime": "2026-08-12T13:28:11.824Z",
		"size": 6785,
		"path": "../public/assets/dialog-BRI5snBN.js"
	},
	"/assets/dist-DE9n1Apn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"207b-JVapxlHt7TFjebOBouulyqqyLag\"",
		"mtime": "2026-08-12T13:28:11.826Z",
		"size": 8315,
		"path": "../public/assets/dist-DE9n1Apn.js"
	},
	"/assets/evaluationService-DSsF7U3o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12c-9tpgVjzuylF5390nfTEFyq1EIXE\"",
		"mtime": "2026-08-12T13:28:11.829Z",
		"size": 300,
		"path": "../public/assets/evaluationService-DSsF7U3o.js"
	},
	"/assets/es2015-Dz_kStbz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6448-gd+ezbOzhL9HEu1XNGfXOx53A/M\"",
		"mtime": "2026-08-12T13:28:11.829Z",
		"size": 25672,
		"path": "../public/assets/es2015-Dz_kStbz.js"
	},
	"/assets/external-link-BYVStqz6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-DDbkcMlq8iFV1dIEKULyOc0xs7I\"",
		"mtime": "2026-08-12T13:28:11.830Z",
		"size": 251,
		"path": "../public/assets/external-link-BYVStqz6.js"
	},
	"/assets/format-DMwnV9NE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14e-LumJng/LgvPOKBFOwJfD81WS3CA\"",
		"mtime": "2026-08-12T13:28:11.831Z",
		"size": 334,
		"path": "../public/assets/format-DMwnV9NE.js"
	},
	"/assets/eye-Cbs9C6DS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-XZbF7E1t9SnCMeEKvAQ4lWCbIvw\"",
		"mtime": "2026-08-12T13:28:11.831Z",
		"size": 256,
		"path": "../public/assets/eye-Cbs9C6DS.js"
	},
	"/assets/gavel-DhRriwXR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13c-INuxSPhHOCloSfoOp/SD0hJ76HE\"",
		"mtime": "2026-08-12T13:28:11.832Z",
		"size": 316,
		"path": "../public/assets/gavel-DhRriwXR.js"
	},
	"/assets/github-CJ9GoCAT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"197-hBMKv7yERi181YT5LDcaaPDrGwM\"",
		"mtime": "2026-08-12T13:28:11.833Z",
		"size": 407,
		"path": "../public/assets/github-CJ9GoCAT.js"
	},
	"/assets/hackathons.index-BKMS_tQR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a35-mx6XRAGdxj1JgIcieDsKPvH1Lqc\"",
		"mtime": "2026-08-12T13:28:11.834Z",
		"size": 2613,
		"path": "../public/assets/hackathons.index-BKMS_tQR.js"
	},
	"/assets/hackathons._hackathonId-BQkZFKGq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"165f-VMou99OYip5nl5YOkrfr2LyOGZg\"",
		"mtime": "2026-08-12T13:28:11.834Z",
		"size": 5727,
		"path": "../public/assets/hackathons._hackathonId-BQkZFKGq.js"
	},
	"/assets/HackathonCard-BDO2m_Up.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d8-sjDt2WMlwxmgX1Bsoazdt2uRg2M\"",
		"mtime": "2026-08-12T13:28:11.798Z",
		"size": 2520,
		"path": "../public/assets/HackathonCard-BDO2m_Up.js"
	},
	"/assets/hero-hackarena-Bgb-AquT.jpg": {
		"type": "image/jpeg",
		"etag": "\"2684d-sTKCJRK0++93kF4ivFJs1PnnC/8\"",
		"mtime": "2026-08-12T13:28:11.873Z",
		"size": 157773,
		"path": "../public/assets/hero-hackarena-Bgb-AquT.jpg"
	},
	"/assets/input-C3R99wb1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26d-2wTQtSBRFD0WVU6SuEuPUFo5d+g\"",
		"mtime": "2026-08-12T13:28:11.836Z",
		"size": 621,
		"path": "../public/assets/input-C3R99wb1.js"
	},
	"/assets/jsx-runtime-B-hcVAMW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"216d-pcqlp1Bv4Kt7yFmWJlJC8xMXx/k\"",
		"mtime": "2026-08-12T13:28:11.838Z",
		"size": 8557,
		"path": "../public/assets/jsx-runtime-B-hcVAMW.js"
	},
	"/assets/hourglass-Bza2NRlr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"168-JbBrg8dEUJ5/XCruDLsM804w+L4\"",
		"mtime": "2026-08-12T13:28:11.835Z",
		"size": 360,
		"path": "../public/assets/hourglass-Bza2NRlr.js"
	},
	"/assets/index-BNYVtnTq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"596a1-L63Q41OLofqNyqI5IILdOu2+eGE\"",
		"mtime": "2026-08-12T13:28:11.796Z",
		"size": 366241,
		"path": "../public/assets/index-BNYVtnTq.js"
	},
	"/assets/judge.assigned-pI5YUxBr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d6b-1YuA+A12WrdOtn04N3IPJ3otZZQ\"",
		"mtime": "2026-08-12T13:28:11.840Z",
		"size": 3435,
		"path": "../public/assets/judge.assigned-pI5YUxBr.js"
	},
	"/assets/judge-BpBXrVmt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"47c-d4V32fb0xyWiHmYbVlTnNCZ+mdw\"",
		"mtime": "2026-08-12T13:28:11.839Z",
		"size": 1148,
		"path": "../public/assets/judge-BpBXrVmt.js"
	},
	"/assets/judge.evaluation._submissionId-CkD5m82C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a42-y3otkMspgQ0UslIlaC87kC7wUT4\"",
		"mtime": "2026-08-12T13:28:11.841Z",
		"size": 14914,
		"path": "../public/assets/judge.evaluation._submissionId-CkD5m82C.js"
	},
	"/assets/label-ClRNYU1p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cf-XKjIsHYBl8dj74Vi8xjxkeGzJeM\"",
		"mtime": "2026-08-12T13:28:11.843Z",
		"size": 719,
		"path": "../public/assets/label-ClRNYU1p.js"
	},
	"/assets/judge.profile-D7syOjpx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-hwOkCtBK71KRkd+jN9eMI8Eofzw\"",
		"mtime": "2026-08-12T13:28:11.842Z",
		"size": 154,
		"path": "../public/assets/judge.profile-D7syOjpx.js"
	},
	"/assets/link-B2AFZ5Kf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b49-ex/vsrb5ooFhozWUcpcAIXtf6sI\"",
		"mtime": "2026-08-12T13:28:11.845Z",
		"size": 23369,
		"path": "../public/assets/link-B2AFZ5Kf.js"
	},
	"/assets/leaderboard-DBF4hgop.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1086-vJnhYao+L/ULnjaTs0b3qRByYHw\"",
		"mtime": "2026-08-12T13:28:11.844Z",
		"size": 4230,
		"path": "../public/assets/leaderboard-DBF4hgop.js"
	},
	"/assets/log-out-u24zIYYN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-02tHNbH7Vwhf2NhD9vGKC1CxvJ4\"",
		"mtime": "2026-08-12T13:28:11.846Z",
		"size": 230,
		"path": "../public/assets/log-out-u24zIYYN.js"
	},
	"/assets/mail-Co1PkbeV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-77vIXcAk8reagOONbG9NIcTdF6w\"",
		"mtime": "2026-08-12T13:28:11.848Z",
		"size": 213,
		"path": "../public/assets/mail-Co1PkbeV.js"
	},
	"/assets/Logo-1e8IQaGS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32d-uAJYfwxejU6GUDgwYZoFmZA8Z40\"",
		"mtime": "2026-08-12T13:28:11.799Z",
		"size": 813,
		"path": "../public/assets/Logo-1e8IQaGS.js"
	},
	"/assets/menu-V1H6Jfm0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bd-Us0bLIOeg334x8qMOKR6AwlggIY\"",
		"mtime": "2026-08-12T13:28:11.849Z",
		"size": 189,
		"path": "../public/assets/menu-V1H6Jfm0.js"
	},
	"/assets/judge.index-BxRKZYOZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9ee-6JoXAIopC/V4U6FSN9tAog8CF6c\"",
		"mtime": "2026-08-12T13:28:11.842Z",
		"size": 2542,
		"path": "../public/assets/judge.index-BxRKZYOZ.js"
	},
	"/assets/mockEvaluations-C1yWvIJz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5a-2fyu6dmgYfiyqjf7hGeWhzUEI1c\"",
		"mtime": "2026-08-12T13:28:11.850Z",
		"size": 3418,
		"path": "../public/assets/mockEvaluations-C1yWvIJz.js"
	},
	"/assets/login-uuDD0cFT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e59-Ex/BdSS3zHqkH+Q15HhIfNg9TbM\"",
		"mtime": "2026-08-12T13:28:11.847Z",
		"size": 3673,
		"path": "../public/assets/login-uuDD0cFT.js"
	},
	"/assets/medal-DCXD_bsr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b3-de+3M6VRaIQY10uI0G+L/TaBWwI\"",
		"mtime": "2026-08-12T13:28:11.849Z",
		"size": 435,
		"path": "../public/assets/medal-DCXD_bsr.js"
	},
	"/assets/mockSubmissions-DdkRB3U9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a19-ROPIESxBjtUmVczGXKj/3ubeQnY\"",
		"mtime": "2026-08-12T13:28:11.852Z",
		"size": 2585,
		"path": "../public/assets/mockSubmissions-DdkRB3U9.js"
	},
	"/assets/mockHackathons-CQ-_1XMU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a98-+xK3SaZAQRL5zygKPSltFdGdQBc\"",
		"mtime": "2026-08-12T13:28:11.851Z",
		"size": 6808,
		"path": "../public/assets/mockHackathons-CQ-_1XMU.js"
	},
	"/assets/mockTeams-BofCFOtg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"95c-WOZxAUUnI4ci3qQgAEU4/HagP9w\"",
		"mtime": "2026-08-12T13:28:11.853Z",
		"size": 2396,
		"path": "../public/assets/mockTeams-BofCFOtg.js"
	},
	"/assets/participant.find-teams--zKtvo40.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dd9-zWxwbaEW8GLJVnJC7pcZJ+d2IIQ\"",
		"mtime": "2026-08-12T13:28:11.855Z",
		"size": 3545,
		"path": "../public/assets/participant.find-teams--zKtvo40.js"
	},
	"/assets/mockUsers-0sODqT4-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dd9-7sgeySDBbkXRp+nrLdcIVw+JVQA\"",
		"mtime": "2026-08-12T13:28:11.853Z",
		"size": 3545,
		"path": "../public/assets/mockUsers-0sODqT4-.js"
	},
	"/assets/participant-z7e3f2FY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4be-by85odY7jbwMOEFDmn6nIgZSDhU\"",
		"mtime": "2026-08-12T13:28:11.854Z",
		"size": 1214,
		"path": "../public/assets/participant-z7e3f2FY.js"
	},
	"/assets/participant.hackathons-lB3pVbAz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ba1-3kKvpK9h3BUVIorYxDyqJQSvKPU\"",
		"mtime": "2026-08-12T13:28:11.855Z",
		"size": 2977,
		"path": "../public/assets/participant.hackathons-lB3pVbAz.js"
	},
	"/assets/PageHeader-DAbZGQDn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21a-WtrmgCsk/WBjJD1lfQ+0j0ybPdY\"",
		"mtime": "2026-08-12T13:28:11.800Z",
		"size": 538,
		"path": "../public/assets/PageHeader-DAbZGQDn.js"
	},
	"/assets/participant.index-CT_iIm-n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dfc-6XblS3jRmTcMIKH1YyH24TBrudg\"",
		"mtime": "2026-08-12T13:28:11.856Z",
		"size": 3580,
		"path": "../public/assets/participant.index-CT_iIm-n.js"
	},
	"/assets/participant.profile-mJk2-FAF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a0-iPnQMw0oW/VQq6Xuf1MVFdXoKqY\"",
		"mtime": "2026-08-12T13:28:11.856Z",
		"size": 160,
		"path": "../public/assets/participant.profile-mJk2-FAF.js"
	},
	"/assets/participant.submission-D15P2ixk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14af-WhKAmzx0NwRnmFly3v/dtSWxK8A\"",
		"mtime": "2026-08-12T13:28:11.857Z",
		"size": 5295,
		"path": "../public/assets/participant.submission-D15P2ixk.js"
	},
	"/assets/participant.results-BF9CgygY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6a-7JvcKqN5+tnFiBJOcMqngmDW/TM\"",
		"mtime": "2026-08-12T13:28:11.857Z",
		"size": 2922,
		"path": "../public/assets/participant.results-BF9CgygY.js"
	},
	"/assets/pencil-CFgylVBP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"114-lUYaUwF/8kuolP1xll6H4TjiaNM\"",
		"mtime": "2026-08-12T13:28:11.859Z",
		"size": 276,
		"path": "../public/assets/pencil-CFgylVBP.js"
	},
	"/assets/participant.team-CDj3XgXs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"179d-AVE99Ptwbez9CXEhZOb6naAKOsY\"",
		"mtime": "2026-08-12T13:28:11.858Z",
		"size": 6045,
		"path": "../public/assets/participant.team-CDj3XgXs.js"
	},
	"/assets/progress-iMt7GTCY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f0-KAYiMQiIDyJbrsbEqCG3X3ydlqc\"",
		"mtime": "2026-08-12T13:28:11.860Z",
		"size": 2288,
		"path": "../public/assets/progress-iMt7GTCY.js"
	},
	"/assets/ProfileView-DlfMCikc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4b-OkbDb7jPOfw8JRuUy+lHWw7eYNE\"",
		"mtime": "2026-08-12T13:28:11.800Z",
		"size": 3147,
		"path": "../public/assets/ProfileView-DlfMCikc.js"
	},
	"/assets/plus-qKI-KwZh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-fL7pyUOcaBb8DfLnjqQYwhLtQHU\"",
		"mtime": "2026-08-12T13:28:11.859Z",
		"size": 153,
		"path": "../public/assets/plus-qKI-KwZh.js"
	},
	"/assets/PublicLayout-CUk9x9qG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d3-GTbAO05GnqkS5v9Mzo9nw6oROnc\"",
		"mtime": "2026-08-12T13:28:11.801Z",
		"size": 6099,
		"path": "../public/assets/PublicLayout-CUk9x9qG.js"
	},
	"/assets/react-dom-sF8Euvcq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dde-aqKHuf81fP3cShclx8Jw44pWPro\"",
		"mtime": "2026-08-12T13:28:11.861Z",
		"size": 3550,
		"path": "../public/assets/react-dom-sF8Euvcq.js"
	},
	"/assets/register-atQ0AJTj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a63-07Dson+PP+f0p1rSGezsRi8B2Ak\"",
		"mtime": "2026-08-12T13:28:11.861Z",
		"size": 2659,
		"path": "../public/assets/register-atQ0AJTj.js"
	},
	"/assets/rocket-Bf8oipz3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c4-lEJDyTuUXneMCFHC4cNN4nPaVD8\"",
		"mtime": "2026-08-12T13:28:11.862Z",
		"size": 452,
		"path": "../public/assets/rocket-Bf8oipz3.js"
	},
	"/assets/routes-Ba45ZnMn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2165-Ch0uKOVvHatsvksPfmHCPxtco2Y\"",
		"mtime": "2026-08-12T13:28:11.862Z",
		"size": 8549,
		"path": "../public/assets/routes-Ba45ZnMn.js"
	},
	"/assets/search-BtJsgOj6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-XB1j66io3rmBfdcdDs6Q8edRKds\"",
		"mtime": "2026-08-12T13:28:11.863Z",
		"size": 174,
		"path": "../public/assets/search-BtJsgOj6.js"
	},
	"/assets/select-CGd96o7a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ba1e-RRKuOD7BkYEA7ET03zV5gqqse7Y\"",
		"mtime": "2026-08-12T13:28:11.863Z",
		"size": 47646,
		"path": "../public/assets/select-CGd96o7a.js"
	},
	"/assets/StatCard-Cf9ioZSP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"324-6TwHWrW0si3wW87oInkDHY5OlJo\"",
		"mtime": "2026-08-12T13:28:11.803Z",
		"size": 804,
		"path": "../public/assets/StatCard-Cf9ioZSP.js"
	},
	"/assets/StatusBadge-DJGWY4-i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42d-s04OE39Z5xPeQKjLNjV8iqNdbes\"",
		"mtime": "2026-08-12T13:28:11.803Z",
		"size": 1069,
		"path": "../public/assets/StatusBadge-DJGWY4-i.js"
	},
	"/assets/submissionService-oLy2l2jy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8-2xClFs6dd+ZiuJD/aTYafQcY+Rc\"",
		"mtime": "2026-08-12T13:28:11.864Z",
		"size": 232,
		"path": "../public/assets/submissionService-oLy2l2jy.js"
	},
	"/assets/table--St1-gf3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66c-Rl3LOr4bdQjdGe78Vh9ya4GYYxE\"",
		"mtime": "2026-08-12T13:28:11.864Z",
		"size": 1644,
		"path": "../public/assets/table--St1-gf3.js"
	},
	"/assets/teamService-CrKAy4J5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1aa-GLtGTdcvpEvz36vlmxLEiVQ4AGY\"",
		"mtime": "2026-08-12T13:28:11.865Z",
		"size": 426,
		"path": "../public/assets/teamService-CrKAy4J5.js"
	},
	"/assets/trash-2-D9HI9O7Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-sFEpw+eOhjMQpJNeJYC0CWU/AqM\"",
		"mtime": "2026-08-12T13:28:11.867Z",
		"size": 328,
		"path": "../public/assets/trash-2-D9HI9O7Q.js"
	},
	"/assets/textarea-B-iM0-8M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"207-JSPelI+OYukLjPwLlAQBvX+GdSg\"",
		"mtime": "2026-08-12T13:28:11.866Z",
		"size": 519,
		"path": "../public/assets/textarea-B-iM0-8M.js"
	},
	"/assets/useMatch-CSXtWTmd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ef-WxeoK7MICYgg/Lxk52LrpcM39MM\"",
		"mtime": "2026-08-12T13:28:11.868Z",
		"size": 1263,
		"path": "../public/assets/useMatch-CSXtWTmd.js"
	},
	"/assets/trophy-BiN7Vuj2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1dc-zwckDcxB9wTfje0nqfQ2gMZsFGQ\"",
		"mtime": "2026-08-12T13:28:11.868Z",
		"size": 476,
		"path": "../public/assets/trophy-BiN7Vuj2.js"
	},
	"/assets/user-BD-nekG6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-jDNjLNZZxpfHTy9Yx+OE6oHVOpo\"",
		"mtime": "2026-08-12T13:28:11.869Z",
		"size": 196,
		"path": "../public/assets/user-BD-nekG6.js"
	},
	"/assets/user-plus-NalbfaH2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-Vu7DjqZ/T1v1rBfptwMjBpejd5o\"",
		"mtime": "2026-08-12T13:28:11.870Z",
		"size": 310,
		"path": "../public/assets/user-plus-NalbfaH2.js"
	},
	"/assets/styles-CPzKuy_n.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"167e6-4k7d3PbT4Tv36DwTFT4WLh5KQRQ\"",
		"mtime": "2026-08-12T13:28:11.874Z",
		"size": 92134,
		"path": "../public/assets/styles-CPzKuy_n.css"
	},
	"/assets/users-D2taoQBY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-77JAPYa1XTnG4ascYI1KV5c+rZw\"",
		"mtime": "2026-08-12T13:28:11.871Z",
		"size": 306,
		"path": "../public/assets/users-D2taoQBY.js"
	},
	"/assets/users-round-NiS0JMfK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"390-naPBa1TctURxlZqMiiJXggSkOw4\"",
		"mtime": "2026-08-12T13:28:11.871Z",
		"size": 912,
		"path": "../public/assets/users-round-NiS0JMfK.js"
	},
	"/assets/x-CGuQtexA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-hbysndGGD769HshBV70OaTPzDQY\"",
		"mtime": "2026-08-12T13:28:11.873Z",
		"size": 154,
		"path": "../public/assets/x-CGuQtexA.js"
	},
	"/assets/utils-DojpP95n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a7e-rehYKtt6GcJPoEspFNv2VomMQ30\"",
		"mtime": "2026-08-12T13:28:11.872Z",
		"size": 27262,
		"path": "../public/assets/utils-DojpP95n.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_m5UC1D = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_m5UC1D
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
