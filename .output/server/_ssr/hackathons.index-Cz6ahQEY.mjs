import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Search } from "../_libs/lucide-react.mjs";
import { t as PublicLayout } from "./PublicLayout-BQplqmZx.mjs";
import { t as PageHeader } from "./PageHeader-DxRBBCep.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as hackathonStatuses } from "./mockHackathons-C96f8Jec.mjs";
import { i as hackathonService } from "./router-ldjDgsUz.mjs";
import { t as HackathonCard } from "./HackathonCard-oLunwDle.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hackathons.index-Cz6ahQEY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HackathonsPage() {
	const all = hackathonService.list();
	const [query, setQuery] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("date");
	const results = (0, import_react.useMemo)(() => {
		let list = all.filter((h) => (status === "all" || h.status === status) && (h.name.toLowerCase().includes(query.toLowerCase()) || h.themes.some((t) => t.toLowerCase().includes(query.toLowerCase()))));
		list = [...list].sort((a, b) => {
			if (sort === "participants") return b.participants - a.participants;
			if (sort === "deadline") return +new Date(a.registrationDeadline) - +new Date(b.registrationDeadline);
			return +new Date(a.startDate) - +new Date(b.startDate);
		});
		return list;
	}, [
		all,
		query,
		status,
		sort
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-7xl space-y-8 px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Hackathons",
				description: "Find the right event, check the deadline and register with your team."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card grid gap-3 rounded-2xl p-4 md:grid-cols-[minmax(0,1fr)_auto_auto]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: "Search hackathons or themes...",
							className: "pl-9"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: status,
						onValueChange: setStatus,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "md:w-52",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Status" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "All statuses"
						}), hackathonStatuses.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: s,
							children: s
						}, s))] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: sort,
						onValueChange: setSort,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "md:w-52",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Sort by" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "date",
								children: "Sort: Start date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "deadline",
								children: "Sort: Deadline"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "participants",
								children: "Sort: Participants"
							})
						] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [results.length, " hackathons found"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3",
				children: results.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HackathonCard, { hackathon: h }, h.id))
			}),
			results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "surface-card rounded-2xl p-12 text-center text-muted-foreground",
				children: "No hackathons match your filters."
			})
		]
	}) });
}
//#endregion
export { HackathonsPage as component };
