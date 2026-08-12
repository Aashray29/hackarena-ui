import { t as cn } from "./utils-C_uf36nf.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatusBadge-CKjLCTDz.js
var import_jsx_runtime = require_jsx_runtime();
var toneClasses = {
	primary: "bg-primary/12 text-primary border-primary/30",
	success: "bg-success/12 text-success border-success/30",
	warning: "bg-warning/12 text-warning border-warning/30",
	info: "bg-info/12 text-info border-info/30",
	accent: "bg-accent/12 text-accent border-accent/30",
	destructive: "bg-destructive/12 text-destructive border-destructive/30",
	muted: "bg-muted text-muted-foreground border-border"
};
var statusTone = {
	"Registration Open": "success",
	Upcoming: "info",
	Ongoing: "warning",
	Completed: "muted",
	Submitted: "success",
	"Not Submitted": "muted",
	Draft: "warning",
	Evaluated: "success",
	Pending: "warning",
	"In Review": "info",
	Active: "success",
	Inactive: "muted",
	Online: "info",
	Offline: "accent",
	Hybrid: "primary"
};
function StatusBadge({ status, tone, className }) {
	const resolved = tone ?? statusTone[status] ?? "primary";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium", toneClasses[resolved], className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), status]
	});
}
//#endregion
export { StatusBadge as t };
