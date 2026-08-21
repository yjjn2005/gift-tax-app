# -*- coding: utf-8 -*-
"""버전을 올리고 Cloudflare + GitHub 에 함께 배포한다.

    python deploy.py            버전 올리고 배포
    python deploy.py --check    배포 없이 버전만 확인

버전을 올려야 하는 이유: 서비스워커 캐시 이름이 버전에 묶여 있어서,
버전이 그대로면 이미 앱을 설치한 기기에 옛 화면이 남는다.
"""
import io, os, re, subprocess, sys
from datetime import datetime

ROOT = os.path.dirname(os.path.abspath(__file__))
HTML = os.path.join(ROOT, 'public', 'index.html')
SW   = os.path.join(ROOT, 'public', 'sw.js')

def read(p):  return io.open(p, encoding='utf-8').read()
def write(p, s): io.open(p, 'w', encoding='utf-8').write(s)

def current():
    m = re.search(r"const APP_VERSION = '([^']+)'", read(HTML))
    return m.group(1) if m else '(없음)'

def bump():
    ver = datetime.now().strftime('%Y%m%d-%H%M')
    h = read(HTML)
    h2 = re.sub(r"const APP_VERSION = '[^']*'", "const APP_VERSION = '%s'" % ver, h)
    if h2 == h:
        raise SystemExit('index.html 에서 APP_VERSION 을 찾지 못했습니다.')
    write(HTML, h2)

    s = read(SW)
    s2 = re.sub(r"const VERSION = '[^']*'", "const VERSION = '%s'" % ver, s)
    if s2 == s:
        raise SystemExit('sw.js 에서 VERSION 을 찾지 못했습니다.')
    write(SW, s2)
    return ver

def run(cmd, **kw):
    print('$', ' '.join(cmd))
    return subprocess.run(cmd, cwd=ROOT, shell=True, **kw)

if __name__ == '__main__':
    if '--check' in sys.argv:
        print('현재 버전:', current())
        raise SystemExit(0)

    ver = bump()
    print('새 버전:', ver)

    if run(['npx', 'wrangler', 'deploy']).returncode != 0:
        raise SystemExit('Cloudflare 배포 실패')

    run(['git', 'add', '-A'])
    run(['git', 'commit', '-q', '-m', 'v%s 배포' % ver])
    run(['git', 'push', '-q', 'origin', 'main'])
    run(['git', 'subtree', 'push', '--prefix', 'public', 'origin', 'gh-pages'])

    print()
    print('배포 완료  v%s' % ver)
    print('  https://gift-tax-app.yjjn2005.workers.dev')
    print('  https://yjjn2005.github.io/gift-tax-app/')
