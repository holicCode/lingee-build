import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import App from '../src/App.jsx'

describe('App 笑脸页面', () => {
  it('渲染圆形脸部、左右对称的眼睛与上扬的嘴角，共同构成完整笑脸', () => {
    const { container } = render(<App />)

    const svg = container.querySelector('svg')
    expect(svg).not.toBeNull()

    // 圆形脸部 + 两只眼睛共 3 个圆，脸部为大半径轮廓圆
    const circles = container.querySelectorAll('circle')
    expect(circles.length).toBe(3)

    const face = circles[0]
    expect(Number(face.getAttribute('r'))).toBe(80)
    expect(face.getAttribute('fill')).toBeTruthy()

    // 眼睛：左右对称的实心圆点
    const leftEye = circles[1]
    const rightEye = circles[2]
    const faceCx = Number(face.getAttribute('cx'))
    const lx = Number(leftEye.getAttribute('cx'))
    const rx = Number(rightEye.getAttribute('cx'))
    expect(faceCx - lx).toBeCloseTo(rx - faceCx)
    expect(Number(leftEye.getAttribute('r'))).toBeGreaterThan(0)
    expect(leftEye.getAttribute('fill')).not.toBe('none')
    expect(Number(rightEye.getAttribute('r'))).toBeGreaterThan(0)
    expect(rightEye.getAttribute('fill')).not.toBe('none')

    // 上扬嘴角：二次贝塞尔曲线，两端点（嘴角）高于弧线中点，即微笑弧
    const mouth = container.querySelector('path')
    expect(mouth).not.toBeNull()
    const d = mouth.getAttribute('d') ?? ''
    const nums = (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number)
    expect(nums.length).toBeGreaterThanOrEqual(6)
    const [x0, y0, , cy, x1, y1] = nums
    const midY = 0.25 * y0 + 0.5 * cy + 0.25 * y1
    expect(y0).toBeLessThan(midY)
    expect(y1).toBeLessThan(midY)
    expect(Math.abs(x1 - x0)).toBeGreaterThan(0)
  })

  it('页面为无状态纯渲染：无输入、按钮等交互元素，打开即呈现', () => {
    const { container } = render(<App />)
    expect(container.querySelector('button, input, select, textarea, a')).toBeNull()
    expect(container.querySelectorAll('.page > svg').length).toBe(1)
  })
})
