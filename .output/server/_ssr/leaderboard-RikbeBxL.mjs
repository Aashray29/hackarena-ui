import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { B as Crown, T as Medal, _ as Search, et as Award } from "../_libs/lucide-react.mjs";
import { t as PublicLayout } from "./PublicLayout-BQplqmZx.mjs";
import { t as PageHeader } from "./PageHeader-DxRBBCep.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as evaluationService } from "./evaluationService-Dw10SHPB.mjs";
import { i as hackathonService } from "./router-ldjDgsUz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leaderboard-RikbeBxL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var podiumStyles = [
	{
		icon: Crown,
		ring: "ring-gold/50",
		text: "text-gold",
		label: "1st Place",
		medal: "🥇",
		order: "sm:order-2 sm:scale-105"
	},
	{
		icon: Medal,
		ring: "ring-silver/50",
		text: "text-silver",
		label: "2nd Place",
		medal: "🥈",
		order: "sm:order-1"
	},
	{
		icon: Award,
		ring: "ring-bronze/50",
		text: "text-bronze",
		label: "3rd Place",
		medal: "🥉",
		order: "sm:order-3"
	}
];
function LeaderboardPage() {
	const entries = evaluationService.leaderboard();
	const hackathons = hackathonService.list();
	const [query, setQuery] = (0, import_react.useState)("");
	const [hackathon, setHackathon] = (0, import_react.useState)("all");
	const filtered = (0, import_react.useMemo)(() => entries.filter((e) => (hackathon === "all" || e.hackathonId === hackathon) && (e.teamName.toLowerCase().includes(query.toLowerCase()) || e.projectName.toLowerCase().includes(query.toLowerCase()))), [
		entries,
		query,
		hackathon
	]);
	const top3 = entries.slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-7xl space-y-10 px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Leaderboard",
				description: "Ranked by total judge score across innovation, technical implementation, presentation and impact."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-3",
				children: top3.map((entry, i) => {
					const style = podiumStyles[i];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("surface-card hover-lift rounded-2xl p-6 text-center ring-1", style.ring, style.order),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-3xl",
								children: style.medal
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("mt-2 font-display text-sm font-semibold", style.text),
								children: style.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 truncate font-display text-xl font-bold",
								children: entry.teamName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 truncate text-sm text-muted-foreground",
								children: entry.projectName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-display text-4xl font-bold text-gradient",
								children: entry.score
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "total score"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 truncate text-xs text-muted-foreground",
								children: entry.hackathonName
							})
						]
					}, entry.teamName);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card grid gap-3 rounded-2xl p-4 md:grid-cols-[minmax(0,1fr)_auto]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search team or project...",
						className: "pl-9"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: hackathon,
					onValueChange: setHackathon,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "md:w-64",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Hackathon" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "all",
						children: "All hackathons"
					}), hackathons.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: h.id,
						children: h.name
					}, h.id))] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card overflow-hidden rounded-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "w-20",
							children: "Rank"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Team" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Project" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "hidden md:table-cell",
							children: "Hackathon"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Score"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filtered.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
							className: "font-display font-bold",
							children: ["#", e.rank]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: e.teamName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: e.college
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-muted-foreground",
							children: e.projectName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "hidden text-muted-foreground md:table-cell",
							children: e.hackathonName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right font-display font-bold text-primary",
							children: e.score
						})
					] }, `${e.teamName}-${e.rank}`)) })] })
				}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-10 text-center text-sm text-muted-foreground",
					children: "No results found."
				})]
			})
		]
	}) });
}
//#endregion
export { LeaderboardPage as component };
