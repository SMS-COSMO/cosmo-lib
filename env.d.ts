/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	// Use object instead of {} to satisfy eslint no-empty-object-type; use unknown to avoid any
	const component: DefineComponent<object, object, unknown>
	export default component
}
