import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { C as Pencil, t as X, v as Save } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-DxRBBCep.mjs";
import { t as Avatar } from "./Avatar-DJVa21j_.mjs";
import { t as authService } from "./authService-Bom7X-RI.mjs";
import { t as StatusBadge } from "./StatusBadge-CKjLCTDz.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProfileView-CoC7YjuU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var roleLabels = {
	participant: "Participant",
	admin: "Administrator",
	judge: "Judge"
};
function ProfileView({ role }) {
	const [profile, setProfile] = (0, import_react.useState)(() => authService.getDemoProfile(role));
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(profile);
	const fields = [
		{
			key: "name",
			label: "Full name"
		},
		{
			key: "email",
			label: "Email",
			type: "email"
		},
		{
			key: "college",
			label: role === "judge" ? "Organisation" : "College"
		},
		{
			key: "phone",
			label: "Phone",
			type: "tel"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Profile",
		description: "Your account details as they appear to organisers and teammates.",
		actions: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			onClick: () => {
				setDraft(profile);
				setEditing(false);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mr-1.5 h-4 w-4" }), " Cancel"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: async () => {
				await authService.updateProfile(draft);
				setProfile(draft);
				setEditing(false);
				toast.success("Profile updated (demo)");
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "mr-1.5 h-4 w-4" }), " Save changes"]
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "secondary",
			onClick: () => setEditing(true),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "mr-1.5 h-4 w-4" }), " Edit profile"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card rounded-2xl p-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
						name: profile.name,
						size: "lg"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 truncate font-display text-xl font-bold",
					children: profile.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 truncate text-sm text-muted-foreground",
					children: profile.email
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
						status: roleLabels[role],
						tone: "primary"
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card rounded-2xl p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-semibold",
				children: "Account details"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-5 sm:grid-cols-2",
				children: [fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: f.key,
						children: f.label
					}), editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: f.key,
						type: f.type ?? "text",
						value: draft[f.key],
						onChange: (e) => setDraft((s) => ({
							...s,
							[f.key]: e.target.value
						}))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate rounded-lg border border-border bg-background/40 px-3 py-2.5 text-sm",
						children: profile[f.key]
					})]
				}, f.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Role" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-lg border border-border bg-background/40 px-3 py-2.5 text-sm",
						children: roleLabels[role]
					})]
				})]
			})]
		})]
	})] });
}
//#endregion
export { ProfileView as t };
