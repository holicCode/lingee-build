const OUTLINE = '#4A3B32'
const FACE_FILL = '#FFD93D'
const TEAR_FILL = '#6EC1E4'

/** 哭脸表情图形：圆形脸、眼睛、下垂的嘴角与自眼部垂落的泪滴。 */
function SadFace() {
  return (
    <svg
      className="sad-face"
      viewBox="0 0 200 200"
      role="img"
      aria-label="哭脸表情：圆形脸、眼睛、下垂的嘴角和泪滴"
    >
      {/* 圆形脸部轮廓 */}
      <circle
        data-testid="face"
        cx="100"
        cy="100"
        r="88"
        fill={FACE_FILL}
        stroke={OUTLINE}
        strokeWidth="5"
      />

      {/* 左眼：眼白 + 瞳孔（瞳孔略向下，呈无神悲伤状） */}
      <g>
        <circle
          data-testid="eye-left"
          cx="64"
          cy="86"
          r="13"
          fill="#FFFFFF"
          stroke={OUTLINE}
          strokeWidth="3"
        />
        <circle cx="64" cy="89" r="6" fill={OUTLINE} />
      </g>

      {/* 右眼：眼白 + 瞳孔 */}
      <g>
        <circle
          data-testid="eye-right"
          cx="136"
          cy="86"
          r="13"
          fill="#FFFFFF"
          stroke={OUTLINE}
          strokeWidth="3"
        />
        <circle cx="136" cy="89" r="6" fill={OUTLINE} />
      </g>

      {/* 下垂的嘴角：端点在下、曲线中部上拱，呈悲伤弧线 */}
      <path
        data-testid="mouth"
        d="M 62 142 Q 100 116 138 142"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* 泪滴：尖端贴左眼下缘，钝端向下垂落 */}
      <path
        data-testid="tear"
        d="M 64 101 C 59.5 110 57 114 57 119 A 7 7 0 0 0 71 119 C 71 114 68.5 110 64 101 Z"
        fill={TEAR_FILL}
      />
    </svg>
  )
}

export default function App() {
  return (
    <main className="page">
      <SadFace />
    </main>
  )
}
