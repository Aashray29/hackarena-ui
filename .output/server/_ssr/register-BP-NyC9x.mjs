import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Logo } from "./Logo-BgZSpn4B.mjs";
import { t as authService } from "./authService-Bom7X-RI.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-BP-NyC9x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var fields = [
	{
		id: "fullName",
		label: "Full name",
		type: "text",
		placeholder: "Aarav Menon"
	},
	{
		id: "email",
		label: "Email",
		type: "email",
		placeholder: "you@college.edu"
	},
	{
		id: "college",
		label: "College",
		type: "text",
		placeholder: "PSG College of Technology"
	},
	{
		id: "phone",
		label: "Phone",
		type: "tel",
		placeholder: "+91 98400 12345"
	},
	{
		id: "password",
		label: "Password",
		type: "password",
		placeholder: "••••••••"
	},
	{
		id: "confirmPassword",
		label: "Confirm password",
		type: "password",
		placeholder: "••••••••"
	}
];
function RegisterPage() {
	const navigate = useNavigate();
	const [form, setForm] = (0, import_react.useState)({});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-glow absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-grid absolute inset-0 opacity-50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card relative w-full max-w-xl rounded-3xl p-7 sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-6 text-center font-display text-2xl font-bold",
						children: "Create your account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-center text-sm text-muted-foreground",
						children: "One profile for every hackathon you join."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-7 grid gap-4 sm:grid-cols-2",
						onSubmit: async (e) => {
							e.preventDefault();
							if (form["password"] !== form["confirmPassword"]) {
								toast.error("Passwords do not match");
								return;
							}
							await authService.register(form);
							toast.success("Account created (demo) — opening your dashboard");
							navigate({ to: "/participant" });
						},
						children: [fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `space-y-2 ${f.id === "email" || f.id === "fullName" ? "sm:col-span-2" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: f.id,
								children: f.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: f.id,
								type: f.type,
								placeholder: f.placeholder,
								value: form[f.id] ?? "",
								onChange: (e) => setForm((s) => ({
									...s,
									[f.id]: e.target.value
								})),
								required: true
							})]
						}, f.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "lg",
							className: "sm:col-span-2",
							children: "Create Account"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-center text-sm text-muted-foreground",
						children: [
							"Already registered?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "text-primary hover:underline",
								children: "Login"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-center text-xs text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hover:text-primary",
							children: "Back to home"
						})
					})
				]
			})
		]
	});
}
//#endregion
export { RegisterPage as component };
