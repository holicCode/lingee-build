import './App.css'

function App() {
  return (
    <main className="page">
      <svg
        className="smiley"
        viewBox="0 0 200 200"
        role="img"
        aria-label="笑脸"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 圆形脸部：面部轮廓与底色 */}
        <circle cx="100" cy="100" r="80" fill="#ffd93b" stroke="#4a3800" strokeWidth="6" />
        {/* 眼睛：左右对称的两个实心圆点 */}
        <circle cx="70" cy="82" r="10" fill="#4a3800" />
        <circle cx="130" cy="82" r="10" fill="#4a3800" />
        {/* 上扬的嘴角：向上弯曲的二次贝塞尔曲线（两端高于中点） */}
        <path
          d="M 62 118 Q 100 156 138 118"
          fill="none"
          stroke="#4a3800"
          strokeWidth="9"
          strokeLinecap="round"
        />
      </svg>
    </main>
  )
}

export default App
