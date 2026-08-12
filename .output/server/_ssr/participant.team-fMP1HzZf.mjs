import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { B as Crown, O as LogOut, o as UserPlus, x as Plus } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-DxRBBCep.mjs";
import { t as Avatar } from "./Avatar-DJVa21j_.mjs";
import { t as StatusBadge } from "./StatusBadge-CKjLCTDz.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-DIo89e4g.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as teamService } from "./teamService-CqLqbVM5.mjs";
import { i as hackathonService } from "./router-ldjDgsUz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/participant.team-fMP1HzZf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MyTeam() {
	const team = teamService.getMyTeam();
	const hackathons = hackathonService.list();
	const [createOpen, setCreateOpen] = (0, import_react.useState)(false);
	const [joinOpen, setJoinOpen] = (0, import_react.useState)(false);
	const [inviteOpen, setInviteOpen] = (0, import_react.useState)(false);
	const [teamName, setTeamName] = (0, import_react.useState)("");
	const [hackathonId, setHackathonId] = (0, import_react.useState)(hackathons[0]?.id ?? "");
	const [joinCode, setJoinCode] = (0, import_react.useState)("");
	const [inviteEmail, setInviteEmail] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "My Team",
			description: "Your roster for the current hackathon.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
					open: createOpen,
					onOpenChange: setCreateOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-4 w-4" }), " Create Team"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Create a team" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Pick a name and the hackathon you're competing in." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "team-name",
									children: "Team name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "team-name",
									value: teamName,
									onChange: (e) => setTeamName(e.target.value),
									placeholder: "Byte Rangers"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Hackathon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: hackathonId,
									onValueChange: setHackathonId,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: hackathons.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: h.id,
										children: h.name
									}, h.id)) })]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: async () => {
								await teamService.create({
									name: teamName,
									hackathonId,
									maxMembers: 4
								});
								setCreateOpen(false);
								toast.success("Team created (demo)");
							},
							children: "Create Team"
						}) })
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
					open: joinOpen,
					onOpenChange: setJoinOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							children: "Join Team"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Join a team" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Enter the invite code shared by the leader." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "code",
								children: "Invite code"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "code",
								value: joinCode,
								onChange: (e) => setJoinCode(e.target.value),
								placeholder: "HA-4821-XZ"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: async () => {
								await teamService.join(joinCode);
								setJoinOpen(false);
								toast.success("Join request sent (demo)");
							},
							children: "Join Team"
						}) })
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
					open: inviteOpen,
					onOpenChange: setInviteOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "mr-1.5 h-4 w-4" }), " Invite Member"] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Invite a member" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "We'll email them an invitation link." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "invite",
								children: "Email address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "invite",
								type: "email",
								value: inviteEmail,
								onChange: (e) => setInviteEmail(e.target.value),
								placeholder: "teammate@college.edu"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: async () => {
								await teamService.invite(inviteEmail);
								setInviteOpen(false);
								toast.success("Invitation sent (demo)");
							},
							children: "Send Invite"
						}) })
					] })]
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "surface-card rounded-2xl p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:flex sm:items-start sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "truncate font-display text-2xl font-bold",
							children: team.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: team.hackathonName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: team.submissionStatus }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "mr-1 inline h-3 w-3 text-gold" }),
										"Leader: ",
										team.leader
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-muted-foreground",
									children: [
										team.members.length,
										" / ",
										team.maxMembers,
										" members"
									]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					className: "text-destructive hover:bg-destructive/10 hover:text-destructive",
					onClick: async () => {
						await teamService.leave(team.id);
						toast.info("You left the team (demo)");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-1.5 h-4 w-4" }), " Leave Team"]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-semibold",
			children: "Team Members"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
			children: [team.members.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card hover-lift rounded-2xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, { name: m.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-medium",
							children: m.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: m.college
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
						status: m.role,
						tone: m.role === "Team Leader" ? "warning" : "muted"
					}), m.skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground",
						children: s
					}, s))]
				})]
			}, m.userId)), Array.from({ length: team.maxMembers - team.members.length }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setInviteOpen(true),
				className: "flex min-h-[9rem] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm",
					children: "Open slot — invite a member"
				})]
			}, i))]
		})] })
	] });
}
//#endregion
export { MyTeam as component };
