import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { b as Quote, l as Trophy } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-DxRBBCep.mjs";
import { t as Progress } from "./progress-DOIEKRJF.mjs";
import { t as evaluationService } from "./evaluationService-Dw10SHPB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/participant.results-BymbSMcf.js
var import_jsx_runtime = require_jsx_runtime();
function ResultsPage() {
	const results = evaluationService.list();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Results",
		description: "Score breakdown and judge feedback for your evaluated submissions."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6",
		children: results.map((r) => {
			const criteria = [
				{
					label: "Innovation",
					value: r.innovation
				},
				{
					label: "Technical",
					value: r.technical
				},
				{
					label: "Presentation",
					value: r.presentation
				},
				{
					label: "Impact",
					value: r.impact
				}
			];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "surface-card rounded-2xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:flex sm:items-start sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "truncate font-display text-xl font-bold",
								children: r.projectName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 truncate text-sm text-muted-foreground",
								children: [
									r.hackathonName,
									" · ",
									r.teamName
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center gap-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-3xl font-bold text-gradient",
									children: r.total
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "/ 100 total"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-gold/40 bg-gold/10 px-4 py-2 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "mx-auto h-4 w-4 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 font-display text-lg font-bold text-gold",
									children: ["#", r.rank]
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-5 sm:grid-cols-2",
						children: criteria.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-muted-foreground",
									children: c.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "shrink-0 font-medium",
									children: [c.value, " / 25"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: c.value / 25 * 100,
								className: "mt-2 h-2"
							})]
						}, c.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-xl border border-border bg-background/40 p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "h-4 w-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-sm font-medium",
								children: ["Feedback from ", r.judgeName]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2.5 text-sm leading-relaxed text-muted-foreground",
							children: r.feedback
						})]
					})
				]
			}, r.id);
		})
	})] });
}
//#endregion
export { ResultsPage as component };
