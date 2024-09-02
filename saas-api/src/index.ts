import { Hono } from 'hono';
const app = new Hono();

app.all('*', async (ctx, next) => {
	if (ctx.req.header('authorization') !== 'demo-auth') {
		return ctx.json({ error: 'Not authorized' }, 401);
	}

	return await next();
});

app.get('/api/status', (ctx) => ctx.json({ status: 'cool' }));

app.notFound((ctx) => ctx.json({ error: 'Not found' }));
app.onError((err, ctx) => ctx.json({ error: err.message, stack: err.stack }));

export default app;
