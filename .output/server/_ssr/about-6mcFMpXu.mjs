import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as Target, l as Trophy, n as Users, y as Rocket } from "../_libs/lucide-react.mjs";
import { t as PublicLayout } from "./PublicLayout-BQplqmZx.mjs";
import { t as PageHeader } from "./PageHeader-DxRBBCep.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-6mcFMpXu.js
var import_jsx_runtime = require_jsx_runtime();
var pillars = [
	{
		icon: Target,
		title: "Built for organisers",
		text: "Manage hackathons, teams, submissions and judge assignments from one admin workspace."
	},
	{
		icon: Users,
		title: "Built for participants",
		text: "Discover events, form teams, track deadlines and submit projects without spreadsheets."
	},
	{
		icon: Trophy,
		title: "Built for judges",
		text: "Structured evaluation across innovation, engineering, presentation and impact."
	},
	{
		icon: Rocket,
		title: "Built to scale",
		text: "A clean component architecture that plugs into any REST backend."
	}
];
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-5xl space-y-10 px-4 py-14 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "About HackArena",
				description: "HackArena started as a college project to replace the mess of forms, spreadsheets and group chats that most hackathons run on."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-card rounded-2xl p-6 sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: "Our mission"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted-foreground",
					children: "We believe great ideas shouldn't be lost to bad logistics. HackArena gives every role in a hackathon — participant, organiser and judge — a purpose-built workspace, so the event runs itself and everyone can focus on building. From registration to the final leaderboard, every step is tracked, transparent and fair."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2",
				children: pillars.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card hover-lift rounded-2xl p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-11 w-11 place-items-center rounded-xl bg-primary/12 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-lg font-semibold",
							children: p.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: p.text
						})
					]
				}, p.title))
			})
		]
	}) });
}
//#endregion
export { About as component };
