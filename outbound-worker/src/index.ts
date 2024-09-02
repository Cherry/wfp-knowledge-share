export default {
	async fetch(req: Request) {
		try {
			const modifiedRequest = new Request(req);

			// Check if we have an Authorization header, if we do remove it
			if (modifiedRequest.headers.get('authorization')) {
				modifiedRequest.headers.delete('authorization');
			}

			// Now append my own auth header
			modifiedRequest.headers.append('authorization', 'demo-auth');

			// Now send our modified request
			return fetch(modifiedRequest);
		} catch (e) {
			return new Response('Error handling outbound: ' + e.message + '\n' + e.stack);
		}
	},
};
