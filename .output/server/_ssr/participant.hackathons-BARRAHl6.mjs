import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PageHeader } from "./PageHeader-DxRBBCep.mjs";
import { r as currentParticipant } from "./mockUsers-DDbqwsAy.mjs";
import { t as StatusBadge } from "./StatusBadge-CKjLCTDz.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as formatDate } from "./format-2rZ3CVxt.mjs";
import { t as mockSubmissions } from "./mockSubmissions-CPu4gVLm.mjs";
import { r as mockTeams } from "./mockTeams-BOxUyN8I.mjs";
import { i as hackathonService } from "./router-ldjDgsUz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/participant.hackathons-BARRAHl6.js
var import_jsx_runtime = require_jsx_runtime();
function MyHackathons() {
	const rows = currentParticipant.registeredHackathons.map((id) => hackathonService.getById(id)).filter((h) => Boolean(h)).map((h) => {
		const team = mockTeams.find((t) => t.hackathonId === h.id);
		const submission = mockSubmissions.find((s) => s.hackathonId === h.id);
		return {
			hackathon: h,
			team: team?.name ?? "—",
			submission: submission ? "Submitted" : "Not Submitted"
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "My Hackathons",
			description: "Everything you're registered for, with team and submission status.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/hackathons",
					children: "Find more"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 lg:hidden",
			children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "truncate font-display text-base font-semibold",
							children: r.hackathon.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.hackathon.status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-3 space-y-1.5 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Date: ", formatDate(r.hackathon.startDate)] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Team: ", r.team] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Submission: ", r.submission] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						variant: "secondary",
						className: "mt-4 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/hackathons/$hackathonId",
							params: { hackathonId: r.hackathon.id },
							children: "View"
						})
					})
				]
			}, r.hackathon.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "surface-card hidden overflow-hidden rounded-2xl lg:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Hackathon" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Team" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Submission" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Action"
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-medium",
						children: r.hackathon.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-muted-foreground",
						children: formatDate(r.hackathon.startDate)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-muted-foreground",
						children: r.team
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.hackathon.status }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.submission }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/hackathons/$hackathonId",
								params: { hackathonId: r.hackathon.id },
								children: "View"
							})
						})
					})
				] }, r.hackathon.id)) })] })
			})
		})
	] });
}
//#endregion
export { MyHackathons as component };
