import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { M as notFound, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as authService } from "./authService-Bom7X-RI.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hackathonService-D_uYfSsU.js
var API_URL = "http://localhost:5000/api";
var mapStatus = (status) => {
	switch (status) {
		case "registration_open": return "Registration Open";
		case "upcoming": return "Upcoming";
		case "ongoing": return "Ongoing";
		case "completed": return "Completed";
		default: return "Upcoming";
	}
};
var mapHackathon = (h) => ({
	id: String(h.hackathon_id),
	name: h.name,
	tagline: "",
	description: h.description || "",
	startDate: h.start_date,
	endDate: h.end_date,
	registrationDeadline: h.registration_deadline,
	minTeamSize: h.team_size_min,
	maxTeamSize: h.team_size_max,
	status: mapStatus(h.status),
	participants: 0,
	teams: 0,
	prizePool: "",
	prizes: [],
	rules: [],
	themes: [],
	technologies: [],
	timeline: [],
	location: "",
	mode: "Online"
});
var hackathonService = {
	async listAsync() {
		const response = await fetch(`${API_URL}/hackathons`, { headers: { Authorization: `Bearer ${authService.getToken()}` } });
		const data = await response.json();
		if (!response.ok || !data.success) throw new Error(data.message || "Failed to fetch hackathons");
		return data.data.map(mapHackathon);
	},
	async getById(id) {
		const response = await fetch(`${API_URL}/hackathons/${id}`, { headers: { Authorization: `Bearer ${authService.getToken()}` } });
		const data = await response.json();
		if (!response.ok || !data.success) throw new Error(data.message || "Failed to fetch hackathon");
		return mapHackathon(data.data);
	},
	async create(payload) {
		const response = await fetch(`${API_URL}/hackathons`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authService.getToken()}`
			},
			body: JSON.stringify(payload)
		});
		const data = await response.json();
		if (!response.ok || !data.success) throw new Error(data.message || "Failed to create hackathon");
		return data;
	},
	async update(id, payload) {
		const response = await fetch(`${API_URL}/hackathons/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authService.getToken()}`
			},
			body: JSON.stringify(payload)
		});
		const data = await response.json();
		if (!response.ok || !data.success) throw new Error(data.message || "Failed to update hackathon");
		return data;
	},
	async remove(id) {
		const response = await fetch(`${API_URL}/hackathons/${id}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${authService.getToken()}` }
		});
		const data = await response.json();
		if (!response.ok || !data.success) throw new Error(data.message || "Failed to delete hackathon");
		return data;
	},
	async register(id) {
		const response = await fetch(`${API_URL}/registrations`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authService.getToken()}`
			},
			body: JSON.stringify({ hackathon_id: Number(id) })
		});
		const data = await response.json();
		if (!response.ok || !data.success) throw new Error(data.message || "Failed to register");
		return data;
	}
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-ldjDgsUz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var styles_default = "/assets/styles-CPzKuy_n.css";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$29 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "HackArena — Hackathon Management System" },
			{
				name: "description",
				content: "HackArena is a hackathon management platform for participants, organisers and judges."
			},
			{
				name: "author",
				content: "HackArena"
			},
			{
				property: "og:title",
				content: "HackArena — Hackathon Management System"
			},
			{
				property: "og:description",
				content: "Discover hackathons, build teams, submit projects and compete."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$29.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-right",
			richColors: true
		})]
	});
}
var $$splitComponentImporter$28 = () => import("./routes-BXUCKsCa.mjs");
var Route$28 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "HackArena — Build. Innovate. Hack." },
		{
			name: "description",
			content: "HackArena is a hackathon management platform to discover events, build teams, submit projects and compete on the leaderboard."
		},
		{
			property: "og:title",
			content: "HackArena — Build. Innovate. Hack."
		},
		{
			property: "og:description",
			content: "Join exciting hackathons, build amazing projects, collaborate with talented developers, and compete for the top spot."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./about-6mcFMpXu.mjs");
var Route$27 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About HackArena — Hackathon Management Platform" },
		{
			name: "description",
			content: "HackArena helps colleges run hackathons end to end: registrations, team formation, project submissions and judge evaluations."
		},
		{
			property: "og:title",
			content: "About HackArena"
		},
		{
			property: "og:description",
			content: "One platform for organisers, participants and judges to run great hackathons."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./admin-BqLo-3J5.mjs");
var Route$26 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$26, "component") });
var $$splitComponentImporter$25 = () => import("./judge-DETNm3PI.mjs");
var Route$25 = createFileRoute("/judge")({ component: lazyRouteComponent($$splitComponentImporter$25, "component") });
var $$splitComponentImporter$24 = () => import("./leaderboard-RikbeBxL.mjs");
var Route$24 = createFileRoute("/leaderboard")({
	head: () => ({ meta: [
		{ title: "Leaderboard — HackArena" },
		{
			name: "description",
			content: "See the top-scoring hackathon teams and projects ranked by judge evaluations."
		},
		{
			property: "og:title",
			content: "Leaderboard — HackArena"
		},
		{
			property: "og:description",
			content: "Top teams, projects and scores across HackArena events."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./login-Dz3rCOqw.mjs");
var Route$23 = createFileRoute("/login")({
	head: () => ({ meta: [
		{ title: "Login — HackArena" },
		{
			name: "description",
			content: "Sign in to your HackArena participant, admin or judge workspace."
		},
		{
			property: "og:title",
			content: "Login — HackArena"
		},
		{
			property: "og:description",
			content: "Access your HackArena dashboard."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./participant-DELAqeWH.mjs");
var Route$22 = createFileRoute("/participant")({ component: lazyRouteComponent($$splitComponentImporter$22, "component") });
var $$splitComponentImporter$21 = () => import("./register-BP-NyC9x.mjs");
var Route$21 = createFileRoute("/register")({
	head: () => ({ meta: [
		{ title: "Create your account — HackArena" },
		{
			name: "description",
			content: "Register on HackArena to join hackathons, form teams and submit projects."
		},
		{
			property: "og:title",
			content: "Create your account — HackArena"
		},
		{
			property: "og:description",
			content: "Join HackArena and start hacking."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./admin.index-OfDsQTQm.mjs");
var Route$20 = createFileRoute("/admin/")({
	head: () => ({ meta: [
		{ title: "Admin Dashboard — HackArena" },
		{
			name: "description",
			content: "Organiser overview of hackathons, participants, teams, submissions and evaluations."
		},
		{
			property: "og:title",
			content: "Admin Dashboard — HackArena"
		},
		{
			property: "og:description",
			content: "Platform-wide hackathon statistics and charts."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./admin.hackathons-DyzGFMDZ.mjs");
var Route$19 = createFileRoute("/admin/hackathons")({
	head: () => ({ meta: [
		{ title: "Manage Hackathons — HackArena Admin" },
		{
			name: "description",
			content: "Create, edit and remove hackathons from the organiser console."
		},
		{
			property: "og:title",
			content: "Manage Hackathons — HackArena Admin"
		},
		{
			property: "og:description",
			content: "Organiser hackathon management."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./admin.judges-CWWvMceY.mjs");
var Route$18 = createFileRoute("/admin/judges")({
	head: () => ({ meta: [
		{ title: "Judges — HackArena Admin" },
		{
			name: "description",
			content: "Manage judges and assign submissions for evaluation."
		},
		{
			property: "og:title",
			content: "Judges — HackArena Admin"
		},
		{
			property: "og:description",
			content: "Judge roster and assignment console."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./admin.participants-CE88JCYQ.mjs");
var Route$17 = createFileRoute("/admin/participants")({
	head: () => ({ meta: [
		{ title: "Participants — HackArena Admin" },
		{
			name: "description",
			content: "Search and manage every registered participant."
		},
		{
			property: "og:title",
			content: "Participants — HackArena Admin"
		},
		{
			property: "og:description",
			content: "Participant directory and registrations."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./admin.results-OXw3ktIs.mjs");
var Route$16 = createFileRoute("/admin/results")({
	head: () => ({ meta: [
		{ title: "Results — HackArena Admin" },
		{
			name: "description",
			content: "Published results and rankings across all hackathons."
		},
		{
			property: "og:title",
			content: "Results — HackArena Admin"
		},
		{
			property: "og:description",
			content: "Final rankings and scores."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./admin.settings-WdBqB_Bn.mjs");
var Route$15 = createFileRoute("/admin/settings")({
	head: () => ({ meta: [
		{ title: "Admin Settings — HackArena" },
		{
			name: "description",
			content: "Manage the organiser account and platform settings."
		},
		{
			property: "og:title",
			content: "Admin Settings — HackArena"
		},
		{
			property: "og:description",
			content: "Organiser account and platform preferences."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./admin.submissions-e8kiyDsD.mjs");
var Route$14 = createFileRoute("/admin/submissions")({
	head: () => ({ meta: [
		{ title: "Submissions — HackArena Admin" },
		{
			name: "description",
			content: "Review project submissions, repositories, demos and scores."
		},
		{
			property: "og:title",
			content: "Submissions — HackArena Admin"
		},
		{
			property: "og:description",
			content: "Submission tracking for organisers."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./admin.teams-CFEQJ079.mjs");
var Route$13 = createFileRoute("/admin/teams")({
	head: () => ({ meta: [
		{ title: "Teams — HackArena Admin" },
		{
			name: "description",
			content: "Review every team, its leader, members and submission status."
		},
		{
			property: "og:title",
			content: "Teams — HackArena Admin"
		},
		{
			property: "og:description",
			content: "Team management for organisers."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./hackathons.index-Cz6ahQEY.mjs");
var Route$12 = createFileRoute("/hackathons/")({
	head: () => ({ meta: [
		{ title: "Hackathons — HackArena" },
		{
			name: "description",
			content: "Browse open, upcoming, ongoing and completed hackathons on HackArena. Filter by status and sort by date, prize or participants."
		},
		{
			property: "og:title",
			content: "Hackathons — HackArena"
		},
		{
			property: "og:description",
			content: "Discover hackathons with deadlines, team sizes, prizes and live participant counts."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./hackathons._hackathonId-xPhjkGgl.mjs");
var Route$11 = createFileRoute("/hackathons/$hackathonId")({
	loader: ({ params }) => {
		const hackathon = hackathonService.getById(params.hackathonId);
		if (!hackathon) throw notFound();
		return { hackathon };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Hackathon not found — HackArena" }, {
			name: "robots",
			content: "noindex"
		}] };
		const { hackathon } = loaderData;
		return { meta: [
			{ title: `${hackathon.name} — HackArena` },
			{
				name: "description",
				content: hackathon.tagline
			},
			{
				property: "og:title",
				content: `${hackathon.name} — HackArena`
			},
			{
				property: "og:description",
				content: hackathon.tagline
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./judge.index-CeJw3gnU.mjs");
var Route$10 = createFileRoute("/judge/")({
	head: () => ({ meta: [
		{ title: "Judge Dashboard — HackArena" },
		{
			name: "description",
			content: "Your evaluation workload, pending reviews and scoring history."
		},
		{
			property: "og:title",
			content: "Judge Dashboard — HackArena"
		},
		{
			property: "og:description",
			content: "Evaluate hackathon projects on HackArena."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./judge.assigned-CRcfdVFN.mjs");
var Route$9 = createFileRoute("/judge/assigned")({
	head: () => ({ meta: [
		{ title: "Assigned Projects — HackArena Judge" },
		{
			name: "description",
			content: "Browse and evaluate the projects assigned to you."
		},
		{
			property: "og:title",
			content: "Assigned Projects — HackArena Judge"
		},
		{
			property: "og:description",
			content: "Judge evaluation queue."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./judge.profile-DDw4rePq.mjs");
var Route$8 = createFileRoute("/judge/profile")({
	head: () => ({ meta: [
		{ title: "Judge Profile — HackArena" },
		{
			name: "description",
			content: "View and edit your HackArena judge profile."
		},
		{
			property: "og:title",
			content: "Judge Profile — HackArena"
		},
		{
			property: "og:description",
			content: "Manage your judge account details."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./participant.index-C95D68oE.mjs");
var Route$7 = createFileRoute("/participant/")({
	head: () => ({ meta: [
		{ title: "Participant Dashboard — HackArena" },
		{
			name: "description",
			content: "Track your hackathon registrations, team status, submissions and deadlines."
		},
		{
			property: "og:title",
			content: "Participant Dashboard — HackArena"
		},
		{
			property: "og:description",
			content: "Your hackathon workspace at a glance."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./participant.find-teams-y75RD_E4.mjs");
var Route$6 = createFileRoute("/participant/find-teams")({
	head: () => ({ meta: [
		{ title: "Find Teams — HackArena" },
		{
			name: "description",
			content: "Discover hackathon teams looking for members with your skills."
		},
		{
			property: "og:title",
			content: "Find Teams — HackArena"
		},
		{
			property: "og:description",
			content: "Browse open teams and request to join."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./participant.hackathons-BARRAHl6.mjs");
var Route$5 = createFileRoute("/participant/hackathons")({
	head: () => ({ meta: [
		{ title: "My Hackathons — HackArena" },
		{
			name: "description",
			content: "All hackathons you have registered for and their status."
		},
		{
			property: "og:title",
			content: "My Hackathons — HackArena"
		},
		{
			property: "og:description",
			content: "Registrations, teams and submission status."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./participant.profile-DAz8BCMY.mjs");
var Route$4 = createFileRoute("/participant/profile")({
	head: () => ({ meta: [
		{ title: "My Profile — HackArena" },
		{
			name: "description",
			content: "View and edit your HackArena participant profile."
		},
		{
			property: "og:title",
			content: "My Profile — HackArena"
		},
		{
			property: "og:description",
			content: "Manage your participant account details."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./participant.results-BymbSMcf.mjs");
var Route$3 = createFileRoute("/participant/results")({
	head: () => ({ meta: [
		{ title: "Results — HackArena" },
		{
			name: "description",
			content: "Your hackathon scores, rank and judge feedback."
		},
		{
			property: "og:title",
			content: "Results — HackArena"
		},
		{
			property: "og:description",
			content: "Detailed scoring breakdown and feedback."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./participant.submission-Do9S9bbX.mjs");
var Route$2 = createFileRoute("/participant/submission")({
	head: () => ({ meta: [
		{ title: "Project Submission — HackArena" },
		{
			name: "description",
			content: "Submit your hackathon project repository, demo and tech stack."
		},
		{
			property: "og:title",
			content: "Project Submission — HackArena"
		},
		{
			property: "og:description",
			content: "Submit and track your hackathon project."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./participant.team-fMP1HzZf.mjs");
var Route$1 = createFileRoute("/participant/team")({
	head: () => ({ meta: [
		{ title: "My Team — HackArena" },
		{
			name: "description",
			content: "Manage your hackathon team, members and invitations."
		},
		{
			property: "og:title",
			content: "My Team — HackArena"
		},
		{
			property: "og:description",
			content: "Team roster, roles and invitations."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./judge.evaluation._submissionId-BIhPpQ1e.mjs");
var Route = createFileRoute("/judge/evaluation/$submissionId")({
	head: () => ({ meta: [
		{ title: "Evaluate Project — HackArena Judge" },
		{
			name: "description",
			content: "Score a hackathon project on innovation, technical depth, impact and presentation."
		},
		{
			property: "og:title",
			content: "Evaluate Project — HackArena Judge"
		},
		{
			property: "og:description",
			content: "Judge scoring form."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$28.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$29
});
var AboutRoute = Route$27.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$29
});
var AdminRoute = Route$26.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$29
});
var JudgeRoute = Route$25.update({
	id: "/judge",
	path: "/judge",
	getParentRoute: () => Route$29
});
var LeaderboardRoute = Route$24.update({
	id: "/leaderboard",
	path: "/leaderboard",
	getParentRoute: () => Route$29
});
var LoginRoute = Route$23.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$29
});
var ParticipantRoute = Route$22.update({
	id: "/participant",
	path: "/participant",
	getParentRoute: () => Route$29
});
var RegisterRoute = Route$21.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$29
});
var AdminIndexRoute = Route$20.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminHackathonsRoute = Route$19.update({
	id: "/hackathons",
	path: "/hackathons",
	getParentRoute: () => AdminRoute
});
var AdminJudgesRoute = Route$18.update({
	id: "/judges",
	path: "/judges",
	getParentRoute: () => AdminRoute
});
var AdminParticipantsRoute = Route$17.update({
	id: "/participants",
	path: "/participants",
	getParentRoute: () => AdminRoute
});
var AdminResultsRoute = Route$16.update({
	id: "/results",
	path: "/results",
	getParentRoute: () => AdminRoute
});
var AdminSettingsRoute = Route$15.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AdminRoute
});
var AdminSubmissionsRoute = Route$14.update({
	id: "/submissions",
	path: "/submissions",
	getParentRoute: () => AdminRoute
});
var AdminTeamsRoute = Route$13.update({
	id: "/teams",
	path: "/teams",
	getParentRoute: () => AdminRoute
});
var HackathonsIndexRoute = Route$12.update({
	id: "/hackathons/",
	path: "/hackathons/",
	getParentRoute: () => Route$29
});
var HackathonsHackathonIdRoute = Route$11.update({
	id: "/hackathons/$hackathonId",
	path: "/hackathons/$hackathonId",
	getParentRoute: () => Route$29
});
var JudgeIndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => JudgeRoute
});
var JudgeAssignedRoute = Route$9.update({
	id: "/assigned",
	path: "/assigned",
	getParentRoute: () => JudgeRoute
});
var JudgeProfileRoute = Route$8.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => JudgeRoute
});
var ParticipantIndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => ParticipantRoute
});
var ParticipantFindTeamsRoute = Route$6.update({
	id: "/find-teams",
	path: "/find-teams",
	getParentRoute: () => ParticipantRoute
});
var ParticipantHackathonsRoute = Route$5.update({
	id: "/hackathons",
	path: "/hackathons",
	getParentRoute: () => ParticipantRoute
});
var ParticipantProfileRoute = Route$4.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => ParticipantRoute
});
var ParticipantResultsRoute = Route$3.update({
	id: "/results",
	path: "/results",
	getParentRoute: () => ParticipantRoute
});
var ParticipantSubmissionRoute = Route$2.update({
	id: "/submission",
	path: "/submission",
	getParentRoute: () => ParticipantRoute
});
var ParticipantTeamRoute = Route$1.update({
	id: "/team",
	path: "/team",
	getParentRoute: () => ParticipantRoute
});
var JudgeEvaluationSubmissionIdRoute = Route.update({
	id: "/evaluation/$submissionId",
	path: "/evaluation/$submissionId",
	getParentRoute: () => JudgeRoute
});
var AdminRouteChildren = {
	AdminHackathonsRoute,
	AdminJudgesRoute,
	AdminParticipantsRoute,
	AdminResultsRoute,
	AdminSettingsRoute,
	AdminSubmissionsRoute,
	AdminTeamsRoute,
	AdminIndexRoute
};
var AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
var JudgeRouteChildren = {
	JudgeAssignedRoute,
	JudgeProfileRoute,
	JudgeIndexRoute,
	JudgeEvaluationSubmissionIdRoute
};
var JudgeRouteWithChildren = JudgeRoute._addFileChildren(JudgeRouteChildren);
var ParticipantRouteChildren = {
	ParticipantFindTeamsRoute,
	ParticipantHackathonsRoute,
	ParticipantProfileRoute,
	ParticipantResultsRoute,
	ParticipantSubmissionRoute,
	ParticipantTeamRoute,
	ParticipantIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AdminRoute: AdminRouteWithChildren,
	JudgeRoute: JudgeRouteWithChildren,
	LeaderboardRoute,
	LoginRoute,
	ParticipantRoute: ParticipantRoute._addFileChildren(ParticipantRouteChildren),
	RegisterRoute,
	HackathonsHackathonIdRoute,
	HackathonsIndexRoute
};
var routeTree = Route$29._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { hackathonService as i, Route as n, Route$11 as r, router_exports as t };
