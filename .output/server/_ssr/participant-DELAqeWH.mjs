import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { f as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as CalendarCheck, A as LayoutDashboard, H as CloudUpload, a as UserSearch, i as User, l as Trophy, n as Users } from "../_libs/lucide-react.mjs";
import { t as DashboardLayout } from "./DashboardLayout-BPB_iiRj.mjs";
import { t as authService } from "./authService-Bom7X-RI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/participant-DELAqeWH.js
var import_jsx_runtime = require_jsx_runtime();
var items = [
	{
		label: "Dashboard",
		to: "/participant",
		icon: LayoutDashboard,
		exact: true
	},
	{
		label: "My Hackathons",
		to: "/participant/hackathons",
		icon: CalendarCheck
	},
	{
		label: "My Team",
		to: "/participant/team",
		icon: Users
	},
	{
		label: "Find Teams",
		to: "/participant/find-teams",
		icon: UserSearch
	},
	{
		label: "Project Submission",
		to: "/participant/submission",
		icon: CloudUpload
	},
	{
		label: "Results",
		to: "/participant/results",
		icon: Trophy
	},
	{
		label: "Profile",
		to: "/participant/profile",
		icon: User
	}
];
function ParticipantLayout() {
	const user = authService.getUser();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardLayout, {
		items,
		roleLabel: "Participant",
		userName: user?.name || "Participant",
		userMeta: user?.email || "",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
//#endregion
export { ParticipantLayout as component };
