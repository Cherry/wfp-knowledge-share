interface Env {
	NAMESPACE: DispatchNamespace;
}

export default {
	async fetch(req: Request, env: Env) {
		try {
			// Get the hostname of the incoming request
			const hostname = new URL(req.url).hostname;

			// Use that as the key to find the Worker
			const worker = env.NAMESPACE.get(
				hostname,
				{},
				{
					limits: {
						cpuMs: 10,
						subRequests: 5,
					},
				},
			);

			return await worker.fetch(req);
		} catch (e) {
			return new Response('Error dispatching to Worker: ' + e.message + '\n' + e.stack);
		}
	},
};
