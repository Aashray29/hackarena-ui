import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Avatar-DJVa21j_.js
var import_jsx_runtime = require_jsx_runtime();
function Avatar({ name, size = "md" }) {
	const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary/25 to-accent/25 font-display font-semibold text-foreground ring-1 ring-border ${{
			sm: "h-8 w-8 text-xs",
			md: "h-11 w-11 text-sm",
			lg: "h-20 w-20 text-2xl"
		}[size]}`,
		children: initials
	});
}
//#endregion
export { Avatar as t };
