/**
 * 유앤김 패밀리 증여 이력 · 증여세 계산 앱 — Cloudflare Worker
 *  · /api/sync/:code   GET / PUT   모든 디바이스 데이터 동기화 (Cloudflare KV, 키 접두어 gift:)
 *  · /api/health                   상태 확인
 *  · 그 외 경로                     public/ 정적 파일 (앱 화면)
 */

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET,PUT,POST,OPTIONS',
  'access-control-allow-headers': 'content-type',
  'access-control-max-age': '86400',
};

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...CORS,
    },
  });

async function syncHandler(request, env, code) {
  if (!env.SYNC) {
    return json({ ok: false, error: 'KV 네임스페이스(SYNC)가 연결되지 않았습니다.' }, 501);
  }
  const key = 'gift:' + code;

  if (request.method === 'GET') {
    const raw = await env.SYNC.get(key);
    if (!raw) return json({ ok: false, error: '해당 동기화 코드로 저장된 데이터가 없습니다.' }, 404);
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      return json({ ok: false, error: '저장된 데이터를 읽을 수 없습니다.' }, 500);
    }
    return json(Object.assign({ ok: true }, parsed));
  }

  if (request.method === 'PUT' || request.method === 'POST') {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return json({ ok: false, error: '잘못된 요청 본문입니다.' }, 400);
    }
    const payload = { savedAt: new Date().toISOString(), data: (body && body.data) || body };
    await env.SYNC.put(key, JSON.stringify(payload));
    return json({ ok: true, savedAt: payload.savedAt });
  }

  return json({ ok: false, error: 'method not allowed' }, 405);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });

    if (path === '/api/health') {
      return json({ ok: true, app: 'gift-tax-app', kv: !!env.SYNC, at: new Date().toISOString() });
    }

    const m = path.match(/^\/api\/sync\/([A-Za-z0-9_-]{4,40})$/);
    if (m) return syncHandler(request, env, m[1].toUpperCase());

    if (path.indexOf('/api/') === 0) return json({ ok: false, error: 'not found' }, 404);

    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response('assets not bound', { status: 500 });
  },
};
