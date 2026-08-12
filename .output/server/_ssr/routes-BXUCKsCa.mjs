import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as ClipboardCheck, M as Hammer, _ as Search, et as Award, g as Send, l as Trophy, n as Users, o as UserPlus, p as Sparkles, s as Upload, tt as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as PublicLayout } from "./PublicLayout-BQplqmZx.mjs";
import { n as mockHackathons } from "./mockHackathons-C96f8Jec.mjs";
import { t as HackathonCard } from "./HackathonCard-oLunwDle.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BXUCKsCa.js
var import_jsx_runtime = require_jsx_runtime();
var hero_hackarena_default = "/assets/hero-hackarena-Bgb-AquT.jpg";
var features = [
	{
		icon: Search,
		title: "Find Hackathons",
		text: "Browse curated college and national hackathons with deadlines, tracks and prizes in one place."
	},
	{
		icon: Users,
		title: "Build Teams",
		text: "Create a team or discover teams looking for your exact skill set before registration closes."
	},
	{
		icon: Upload,
		title: "Submit Projects",
		text: "Submit your repository, demo link and tech stack through a single guided submission flow."
	},
	{
		icon: Trophy,
		title: "Compete & Win",
		text: "Get scored by expert judges on innovation, engineering, presentation and impact."
	}
];
var steps = [
	{
		icon: UserPlus,
		title: "Register",
		text: "Create your HackArena profile."
	},
	{
		icon: Users,
		title: "Join / Create Team",
		text: "Team up with the right people."
	},
	{
		icon: Hammer,
		title: "Build Your Project",
		text: "Ship during the hack window."
	},
	{
		icon: Send,
		title: "Submit",
		text: "Push repo and demo links."
	},
	{
		icon: ClipboardCheck,
		title: "Get Evaluated",
		text: "Judges score your work."
	},
	{
		icon: Award,
		title: "Win",
		text: "Climb the leaderboard."
	}
];
function Landing() {
	const featured = mockHackathons.slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden border-b border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-glow absolute inset-0" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-grid absolute inset-0 opacity-60" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), "5 hackathons live this season"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-5 font-display text-4xl font-bold leading-[1.05] sm:text-6xl",
								children: [
									"Build. ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gradient",
										children: "Innovate."
									}),
									" Hack."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-xl text-base text-muted-foreground sm:text-lg",
								children: "Join exciting hackathons, build amazing projects, collaborate with talented developers, and compete for the top spot."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/hackathons",
										children: ["Explore Hackathons ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									variant: "secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/register",
										children: "Register Now"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
								className: "mt-10 grid max-w-lg grid-cols-3 gap-4",
								children: [
									{
										k: "1,480+",
										v: "Participants"
									},
									{
										k: "373",
										v: "Teams formed"
									},
									{
										k: "₹9L+",
										v: "Prizes awarded"
									}
								].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "font-display text-2xl font-bold text-foreground",
										children: s.k
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "truncate text-xs text-muted-foreground",
										children: s.v
									})]
								}, s.v))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: hero_hackarena_default,
							alt: "Abstract visualisation of code panels and network nodes representing a hackathon platform",
							width: 1600,
							height: 1104,
							className: "w-full rounded-3xl border border-border object-cover shadow-[var(--shadow-elegant)]"
						})
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold",
					children: "Everything a hackathon needs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted-foreground",
					children: "From discovery to evaluation, HackArena handles the full lifecycle for participants, organisers and judges."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
				children: features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card hover-lift rounded-2xl p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-11 w-11 place-items-center rounded-xl bg-primary/12 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-lg font-semibold",
							children: f.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: f.text
						})
					]
				}, f.title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-card/30",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-bold",
						children: "How it works"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-muted-foreground",
						children: "Six steps from sign-up to the winners' stage."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
						children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "surface-card hover-lift rounded-2xl p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/25 font-display font-bold text-primary",
										children: i + 1
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-5 w-5 shrink-0 text-muted-foreground" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 font-display text-base font-semibold",
									children: s.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-sm text-muted-foreground",
									children: s.text
								})
							]
						}, s.title))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:flex sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-bold",
						children: "Featured hackathons"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Registrations closing soon."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/hackathons",
						children: "View all"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3",
				children: featured.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HackathonCard, { hackathon: h }, h.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card hero-glow relative overflow-hidden rounded-3xl px-6 py-14 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-bold sm:text-4xl",
						children: "Ready to ship something great?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-3 max-w-xl text-muted-foreground",
						children: "Create your account and register for your first hackathon in under two minutes."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 flex flex-wrap justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/register",
								children: "Register Now"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Login"
							})
						})]
					})
				]
			})
		})
	] });
}
//#endregion
export { Landing as component };
