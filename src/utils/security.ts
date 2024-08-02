export function escapeHTML(str: string) {
	return str
		.replaceAll(/&/g, '&amp;')
		.replaceAll(/</g, '&lt;')
		.replaceAll(/>/g, '&gt;')
		.replaceAll(/"/g, '&quot;')
		.replaceAll(/'/g, '&#39;');
}
