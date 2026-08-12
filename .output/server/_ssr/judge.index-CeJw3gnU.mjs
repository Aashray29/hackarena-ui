import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { K as CircleCheck, W as ClipboardList, f as Star, j as Hourglass } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-DxRBBCep.mjs";
import { t as StatusBadge } from "./StatusBadge-CKjLCTDz.mjs";
import { t as StatCard } from "./StatCard-BGytPlkg.mjs";
import { t as submissionService } from "./submissionService-D9WF4Qpf.mjs";
import { t as evaluationService } from "./evaluationService-Dw10SHPB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/judge.index-CeJw3gnU.js
var import_jsx_runtime = require_jsx_runtime();
function JudgeDashboard() {
	const submissions = submissionService.list();
	const evaluations = evaluationService.list();
	const pending = submissions.filter((s) => s.evaluationStatus !== "Evaluated");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Judge Dashboard",
			description: "Projects assigned to you for evaluation.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/judge/assigned",
					children: "Start evaluating"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Assigned Projects",
					value: submissions.length,
					icon: ClipboardList
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Evaluated",
					value: evaluations.length,
					icon: CircleCheck
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Pending",
					value: pending.length,
					icon: Hourglass
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Average Score Given",
					value: 86,
					icon: Star,
					hint: "out of 100"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "surface-card rounded-2xl p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-semibold",
				children: "Pending evaluations"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-3",
				children: pending.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-border bg-background/40 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-medium",
							children: s.projectName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-sm text-muted-foreground",
							children: [
								s.teamName,
								" · ",
								s.hackathonName
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: s.evaluationStatus }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/judge/evaluation/$submissionId",
								params: { submissionId: s.id },
								children: "Evaluate"
							})
						})]
					})]
				}, s.id))
			})]
		})
	] });
}
//#endregion
export { JudgeDashboard as component };
