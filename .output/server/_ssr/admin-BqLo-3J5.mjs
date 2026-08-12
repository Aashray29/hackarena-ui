import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { f as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as LayoutDashboard, L as FileCodeCorner, P as Gavel, Z as CalendarRange, h as Settings, l as Trophy, n as Users, r as UsersRound } from "../_libs/lucide-react.mjs";
import { t as currentAdmin } from "./mockUsers-DDbqwsAy.mjs";
import { t as DashboardLayout } from "./DashboardLayout-BPB_iiRj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BqLo-3J5.js
var import_jsx_runtime = require_jsx_runtime();
var items = [
	{
		label: "Dashboard",
		to: "/admin",
		icon: LayoutDashboard,
		exact: true
	},
	{
		label: "Hackathons",
		to: "/admin/hackathons",
		icon: CalendarRange
	},
	{
		label: "Participants",
		to: "/admin/participants",
		icon: Users
	},
	{
		label: "Teams",
		to: "/admin/teams",
		icon: UsersRound
	},
	{
		label: "Submissions",
		to: "/admin/submissions",
		icon: FileCodeCorner
	},
	{
		label: "Judges",
		to: "/admin/judges",
		icon: Gavel
	},
	{
		label: "Results",
		to: "/admin/results",
		icon: Trophy
	},
	{
		label: "Settings",
		to: "/admin/settings",
		icon: Settings
	}
];
function AdminLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardLayout, {
		items,
		roleLabel: "Admin",
		userName: currentAdmin.name,
		userMeta: currentAdmin.college,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
//#endregion
export { AdminLayout as component };
