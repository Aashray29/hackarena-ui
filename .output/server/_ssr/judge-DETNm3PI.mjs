import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { f as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as LayoutDashboard, F as FolderKanban, X as CheckCheck, i as User, j as Hourglass } from "../_libs/lucide-react.mjs";
import { n as currentJudge } from "./mockUsers-DDbqwsAy.mjs";
import { t as DashboardLayout } from "./DashboardLayout-BPB_iiRj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/judge-DETNm3PI.js
var import_jsx_runtime = require_jsx_runtime();
var items = [
	{
		label: "Dashboard",
		to: "/judge",
		icon: LayoutDashboard,
		exact: true
	},
	{
		label: "Assigned Projects",
		to: "/judge/assigned",
		icon: FolderKanban
	},
	{
		label: "Pending Evaluations",
		to: "/judge/pending",
		icon: Hourglass
	},
	{
		label: "Completed Evaluations",
		to: "/judge/completed",
		icon: CheckCheck
	},
	{
		label: "Profile",
		to: "/judge/profile",
		icon: User
	}
];
function JudgeLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardLayout, {
		items,
		roleLabel: "Judge",
		userName: currentJudge.name,
		userMeta: currentJudge.organization,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
//#endregion
export { JudgeLayout as component };
