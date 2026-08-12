import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { N as Github, R as Eye, W as ClipboardList, z as ExternalLink } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-DxRBBCep.mjs";
import { t as StatusBadge } from "./StatusBadge-CKjLCTDz.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as formatDate } from "./format-2rZ3CVxt.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as submissionService } from "./submissionService-D9WF4Qpf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.submissions-e8kiyDsD.js
var import_jsx_runtime = require_jsx_runtime();
function AdminSubmissions() {
	const submissions = submissionService.list();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Submissions",
		description: "Every project submitted across hackathons."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "surface-card overflow-hidden rounded-2xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Team" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Project" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Hackathon" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Submitted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Evaluation" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Score" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Actions"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: submissions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: s.teamName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-muted-foreground",
					children: s.projectName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-muted-foreground",
					children: s.hackathonName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "whitespace-nowrap text-muted-foreground",
					children: formatDate(s.submittedAt)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: s.evaluationStatus }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-display font-semibold text-primary",
					children: s.score ?? "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							"aria-label": "View submission",
							onClick: () => toast.info(`Opening ${s.projectName} (demo)`),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "icon",
							variant: "ghost",
							"aria-label": "View GitHub",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: s.githubUrl,
								target: "_blank",
								rel: "noreferrer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "h-4 w-4" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "icon",
							variant: "ghost",
							"aria-label": "View demo",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: s.demoUrl,
								target: "_blank",
								rel: "noreferrer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-4 w-4" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							"aria-label": "View evaluation",
							onClick: () => toast.info(`Evaluation for ${s.projectName} (demo)`),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "h-4 w-4" })
						})
					]
				}) })
			] }, s.id)) })] })
		})
	})] });
}
//#endregion
export { AdminSubmissions as component };
