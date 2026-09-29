export const dynamic = 'force-static';
export function GET() {
  return Response.json({
    ok: true,
    contentMode: process.env.CONTENT_MODE || 'demo',
    newsletter: 'pending',
  });
}
