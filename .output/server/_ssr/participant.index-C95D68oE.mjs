import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as CalendarCheck, H as CloudUpload, I as Flame, U as Clock, n as Users, tt as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-DxRBBCep.mjs";
import { r as currentParticipant } from "./mockUsers-DDbqwsAy.mjs";
import { t as StatusBadge } from "./StatusBadge-CKjLCTDz.mjs";
import { t as formatDate } from "./format-2rZ3CVxt.mjs";
import { t as StatCard } from "./StatCard-BGytPlkg.mjs";
import { n as mockActivity } from "./mockEvaluations-Ukch97-E.mjs";
import { i as hackathonService } from "./router-ldjDgsUz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/participant.index-C95D68oE.js
var import_jsx_runtime = require_jsx_runtime();
function ParticipantDashboard() {
	const upcoming = hackathonService.list().filter((h) => h.status !== "Completed").slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: `Welcome back, ${currentParticipant.name.split(" ")[0]}`,
			description: "Here's what's happening across your hackathons.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/hackathons",
					children: "Explore hackathons"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Registered Hackathons",
					value: 3,
					icon: CalendarCheck,
					hint: "Across 2 seasons"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Active Hackathons",
					value: 2,
					icon: Flame,
					hint: "CodeStorm, SmartCity"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Team Members",
					value: 2,
					icon: Users,
					hint: "Byte Rangers"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Submissions",
					value: 1,
					icon: CloudUpload,
					hint: "1 evaluated"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Upcoming Deadline",
					value: "05 Sep",
					icon: Clock,
					hint: "CodeStorm registration"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-card rounded-2xl p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "truncate font-display text-lg font-semibold",
						children: "Upcoming Hackathons"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/hackathons",
						className: "shrink-0 text-sm text-primary hover:underline",
						children: "View all"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 space-y-3",
					children: upcoming.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-background/40 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-medium",
									children: h.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-0.5 truncate text-xs text-muted-foreground",
									children: [
										formatDate(h.startDate),
										" · closes ",
										formatDate(h.registrationDeadline)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: h.status })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/hackathons/$hackathonId",
								params: { hackathonId: h.id },
								children: ["Open ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })]
							})
						})]
					}, h.id))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-card rounded-2xl p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Recent Activity"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-5 space-y-5 border-l border-border pl-5",
					children: mockActivity.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "relative min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: a.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: a.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] uppercase tracking-wide text-muted-foreground",
								children: a.time
							})
						]
					}, a.id))
				})]
			})]
		})
	] });
}
//#endregion
export { ParticipantDashboard as component };
