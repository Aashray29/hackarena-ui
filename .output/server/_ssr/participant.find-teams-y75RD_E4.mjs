import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { B as Crown, _ as Search } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-DxRBBCep.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as allSkills } from "./mockTeams-BOxUyN8I.mjs";
import { t as teamService } from "./teamService-CqLqbVM5.mjs";
import { i as hackathonService } from "./router-ldjDgsUz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/participant.find-teams-y75RD_E4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FindTeams() {
	const teams = teamService.list();
	const hackathons = hackathonService.list();
	const [query, setQuery] = (0, import_react.useState)("");
	const [hackathon, setHackathon] = (0, import_react.useState)("all");
	const [skill, setSkill] = (0, import_react.useState)("all");
	const results = (0, import_react.useMemo)(() => teams.filter((t) => (hackathon === "all" || t.hackathonId === hackathon) && (skill === "all" || t.requiredSkills.includes(skill)) && t.name.toLowerCase().includes(query.toLowerCase())), [
		teams,
		query,
		hackathon,
		skill
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Find Teams",
			description: "Teams currently looking for members. Send a request and the leader will review it."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card grid gap-3 rounded-2xl p-4 lg:grid-cols-[minmax(0,1fr)_auto_auto]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search teams...",
						className: "pl-9"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: hackathon,
					onValueChange: setHackathon,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "lg:w-56",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Hackathon" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "all",
						children: "All hackathons"
					}), hackathons.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: h.id,
						children: h.name
					}, h.id))] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: skill,
					onValueChange: setSkill,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "lg:w-48",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Skill" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "all",
						children: "All skills"
					}), allSkills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: s,
						children: s
					}, s))] })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-5 md:grid-cols-2 xl:grid-cols-3",
			children: results.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "surface-card hover-lift flex flex-col rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "truncate font-display text-lg font-semibold",
							children: t.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "shrink-0 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs text-primary",
							children: [
								t.members.length,
								"/",
								t.maxMembers
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 truncate text-sm text-muted-foreground",
						children: t.hackathonName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 flex items-center gap-1.5 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-4 w-4 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: t.leader
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wide text-muted-foreground",
							children: "Looking for"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: t.requiredSkills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-lg border border-border bg-background/40 px-2.5 py-1 text-xs text-muted-foreground",
								children: s
							}, s))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-5 w-full",
						disabled: !t.lookingForMembers || t.members.length >= t.maxMembers,
						onClick: async () => {
							await teamService.requestToJoin(t.id);
							toast.success(`Join request sent to ${t.name}`);
						},
						children: t.lookingForMembers ? "Request to Join" : "Team is full"
					})
				]
			}, t.id))
		}),
		results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "surface-card rounded-2xl p-12 text-center text-muted-foreground",
			children: "No teams match your filters."
		})
	] });
}
//#endregion
export { FindTeams as component };
