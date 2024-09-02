interface Env {
	ASSETS: Fetcher;
}

export default {
	async fetch(req: Request, env: Env) {
		try {
			const assetUrl = new URL(req.url);
			if (assetUrl.pathname === '/') {
				assetUrl.pathname = 'index.html';
			}

			const asset = await env.ASSETS.fetch(assetUrl, req);

			const res = await fetch('https://saas.example.walshy.dev/api/status');
			const { status } = await res.json<{ status: string }>();

			return new HTMLRewriter().on('h1', new AssetHandler(status)).transform(asset);
		} catch (e) {
			return new Response('User Worker failed: ' + e.message + '\n' + e.stack);
		}
	},
};

class AssetHandler {
	#status: string;

	constructor(status: string) {
		this.#status = status;
	}

	text(text: Text) {
		text.replace(text.text.replace('{STATUS}', this.#status));
	}
}
