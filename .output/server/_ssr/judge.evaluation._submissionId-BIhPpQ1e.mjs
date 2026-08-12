import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { M as notFound, _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as Github, nt as ArrowLeft, z as ExternalLink } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-DxRBBCep.mjs";
import { t as StatusBadge } from "./StatusBadge-CKjLCTDz.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as submissionService } from "./submissionService-D9WF4Qpf.mjs";
import { t as evaluationService } from "./evaluationService-Dw10SHPB.mjs";
import { n as Route } from "./router-ldjDgsUz.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/radix-ui__react-slider.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/judge.evaluation._submissionId-BIhPpQ1e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
var criteria = [
	{
		key: "innovation",
		label: "Innovation & Creativity",
		max: 25
	},
	{
		key: "technical",
		label: "Technical Complexity",
		max: 25
	},
	{
		key: "impact",
		label: "Impact & Usefulness",
		max: 25
	},
	{
		key: "presentation",
		label: "Presentation & Demo",
		max: 25
	}
];
function JudgeEvaluation() {
	const { submissionId } = Route.useParams();
	const navigate = useNavigate();
	const submission = submissionService.list().find((s) => s.id === submissionId);
	const [scores, setScores] = (0, import_react.useState)({
		innovation: 20,
		technical: 20,
		impact: 20,
		presentation: 20
	});
	const [feedback, setFeedback] = (0, import_react.useState)("");
	if (!submission) throw notFound();
	const total = criteria.reduce((sum, c) => sum + (scores[c.key] ?? 0), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "ghost",
			size: "sm",
			className: "w-fit",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/judge/assigned",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-1.5 h-4 w-4" }), " Back to assigned"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: submission.projectName,
			description: `${submission.teamName} · ${submission.hackathonName}`,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: submission.evaluationStatus })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "surface-card space-y-7 rounded-2xl p-6",
				onSubmit: async (e) => {
					e.preventDefault();
					await evaluationService.submit({
						submissionId,
						innovation: scores["innovation"] ?? 0,
						technical: scores["technical"] ?? 0,
						impact: scores["impact"] ?? 0,
						presentation: scores["presentation"] ?? 0,
						feedback
					});
					toast.success("Evaluation submitted");
					navigate({ to: "/judge/assigned" });
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Scoring"
					}),
					criteria.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "truncate",
								children: c.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "shrink-0 font-display text-sm font-bold text-primary",
								children: [
									scores[c.key],
									" / ",
									c.max
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							value: [scores[c.key] ?? 0],
							max: c.max,
							step: 1,
							onValueChange: ([v]) => setScores((p) => ({
								...p,
								[c.key]: v ?? 0
							}))
						})]
					}, c.key)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "feedback",
							children: "Feedback for the team"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "feedback",
							rows: 5,
							value: feedback,
							onChange: (e) => setFeedback(e.target.value),
							placeholder: "Highlight strengths and what could be improved...",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-border bg-background/40 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Total score"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-3xl font-bold text-gradient",
								children: [total, "/100"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "lg",
							className: "shrink-0",
							children: "Submit Evaluation"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "surface-card rounded-2xl p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Project details"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: submission.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: submission.technologies.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground",
								children: t
							}, t))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								variant: "secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: submission.githubUrl,
									target: "_blank",
									rel: "noreferrer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "mr-1.5 h-4 w-4" }), " Repository"]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								variant: "secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: submission.demoUrl,
									target: "_blank",
									rel: "noreferrer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "mr-1.5 h-4 w-4" }), " Live demo"]
								})
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "surface-card rounded-2xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Scoring guide"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "21–25 — Outstanding, best in class" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "16–20 — Strong, above expectations" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "11–15 — Solid, meets expectations" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "0–10 — Needs significant work" })
						]
					})]
				})]
			})]
		})
	] });
}
//#endregion
export { JudgeEvaluation as component };
