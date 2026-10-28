import './index.css'

const BASE = { x: 240, y: 332 }

// 放射状羽片角度：中心垂直，向两侧对称展开（模拟羽毛裙张开角度）
const FEATHER_ANGLES = [42, -42, 35, -35, 28, -28, 21, -21, 14, -14, 7, -7, 0]

// 单片羽瓣（以球裙基部为原点向上生长的叶片形）
const VANE_PATH = 'M 240 80 C 262 118 267 204 240 312 C 213 204 218 118 240 80 Z'

// 羽毛之间的编织线圈（两道，增强羽毛球结构辨识度）
const THREADS = [
  { cy: 170, rx: 148, ry: 30, opacity: 0.5 },
  { cy: 214, rx: 116, ry: 25, opacity: 0.38 }
]

const PARTICLES = [
  { left: '5%', size: 5, dur: '15s', delay: '0s', drift: '24px', tone: 'cyan' },
  { left: '12%', size: 3, dur: '11s', delay: '2.5s', drift: '-18px', tone: 'violet' },
  { left: '19%', size: 4, dur: '17s', delay: '5s', drift: '30px', tone: 'cyan' },
  { left: '26%', size: 6, dur: '13s', delay: '1.2s', drift: '-26px', tone: 'violet' },
  { left: '33%', size: 3, dur: '19s', delay: '7s', drift: '14px', tone: 'cyan' },
  { left: '41%', size: 5, dur: '12s', delay: '3.8s', drift: '-22px', tone: 'cyan' },
  { left: '49%', size: 4, dur: '16s', delay: '0.6s', drift: '26px', tone: 'violet' },
  { left: '57%', size: 6, dur: '14s', delay: '6.4s', drift: '-30px', tone: 'cyan' },
  { left: '64%', size: 3, dur: '10s', delay: '4.4s', drift: '18px', tone: 'violet' },
  { left: '71%', size: 5, dur: '18s', delay: '8.2s', drift: '-20px', tone: 'cyan' },
  { left: '78%', size: 4, dur: '12s', delay: '1.8s', drift: '28px', tone: 'violet' },
  { left: '85%', size: 6, dur: '15s', delay: '5.6s', drift: '-24px', tone: 'cyan' },
  { left: '91%', size: 3, dur: '11s', delay: '2.2s', drift: '16px', tone: 'violet' },
  { left: '96%', size: 4, dur: '17s', delay: '9s', drift: '-14px', tone: 'cyan' }
]

function Shuttlecock () {
  return (
    <svg
      className="shuttle"
      viewBox="0 0 480 500"
      role="img"
      aria-label="羽毛球主视觉：软木球头与放射状羽片"
    >
      <defs>
        <radialGradient id="scCork" cx="36%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#fffdf6" />
          <stop offset="42%" stopColor="#eadfc3" />
          <stop offset="100%" stopColor="#9c855f" />
        </radialGradient>
        <linearGradient id="scVane" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.96" />
          <stop offset="58%" stopColor="#d9edfd" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7cc8f2" stopOpacity="0.92" />
        </linearGradient>
        <linearGradient id="scRing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cfe2f1" />
        </linearGradient>
        <radialGradient id="scGlint" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="scShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#010509" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#010509" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 地面投影：随主体浮动呼吸缩放 */}
      <ellipse className="ground-shadow" cx="240" cy="462" rx="92" ry="13" fill="url(#scShadow)" />

      {/* 羽裙：外层羽片先绘制、内层覆盖，形成放射层次 */}
      <g className="shuttle-body">
        {FEATHER_ANGLES.map(angle => {
          const fillOpacity = 0.68 + 0.32 * (1 - Math.abs(angle) / 44)
          return (
            <g key={angle} transform={`rotate(${angle} ${BASE.x} ${BASE.y})`}>
              <g
                className="feather"
                style={{ '--sway-delay': `${(Math.abs(angle) * 0.16).toFixed(2)}s` }}
              >
                <path
                  d={VANE_PATH}
                  fill="url(#scVane)"
                  fillOpacity={fillOpacity}
                  stroke="rgba(191, 230, 255, 0.4)"
                  strokeWidth="1"
                />
                <line
                  x1="240"
                  y1="316"
                  x2="240"
                  y2="98"
                  stroke="rgba(255, 255, 255, 0.62)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
            </g>
          )
        })}

        {THREADS.map(t => (
          <ellipse
            key={t.cy}
            cx="240"
            cy={t.cy}
            rx={t.rx}
            ry={t.ry}
            fill="none"
            stroke="rgba(226, 240, 252, 1)"
            strokeOpacity={t.opacity}
            strokeWidth="1.3"
          />
        ))}

        {/* 球裙连接环（白色皮环） */}
        <ellipse
          cx="240"
          cy="332"
          rx="43"
          ry="11.5"
          fill="url(#scRing)"
          stroke="rgba(20, 16, 8, 0.16)"
          strokeWidth="1"
        />

        {/* 软木球头 */}
        <circle cx="240" cy="386" r="46" fill="url(#scCork)" stroke="rgba(20, 16, 8, 0.22)" strokeWidth="1.5" />
        <path d="M 200 372 Q 240 396 280 372" stroke="rgba(122, 98, 62, 0.25)" fill="none" strokeWidth="1.4" />
        <path d="M 198 388 Q 240 410 282 388" stroke="rgba(122, 98, 62, 0.2)" fill="none" strokeWidth="1.2" />

        {/* 球头高光（呼吸） */}
        <ellipse
          className="ball-glint"
          cx="224"
          cy="369"
          rx="18"
          ry="10"
          fill="url(#scGlint)"
          transform="rotate(-18 224 369)"
        />
      </g>
    </svg>
  )
}

export default function App () {
  return (
    <div className="stage">
      <div className="backdrop" aria-hidden="true" />
      <div className="particles" aria-hidden="true">
        {PARTICLES.map(p => (
          <span
            key={p.left}
            className={`particle ${p.tone}`}
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              '--dur': p.dur,
              '--delay': p.delay,
              '--drift': p.drift
            }}
          />
        ))}
      </div>

      <header className="masthead">
        <p className="kicker">Shuttlecock · Aerodynamics</p>
        <h1 className="title">羽毛球</h1>
      </header>

      <main className="hero">
        <div className="halo" aria-hidden="true" />
        <div className="shuttle-wrap">
          <Shuttlecock />
        </div>
      </main>

      <footer className="footnote">
        <span>软木球头</span>
        <span>放射羽裙</span>
        <span>≈ 5 g · 轻盈</span>
      </footer>
    </div>
  )
}
