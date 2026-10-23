import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import App from './App'

describe('App 哭脸界面', () => {
  it('渲染带可访问名称的哭脸 SVG 画布', () => {
    const { container } = render(<App />)
    const svg = container.querySelector('svg[role="img"]')
    expect(svg).not.toBeNull()
    expect(svg?.getAttribute('aria-label')).toContain('哭脸')
  })

  it('包含圆形脸部轮廓与左右两只眼睛', () => {
    const { container } = render(<App />)
    const face = container.querySelector('[data-testid="face"]')
    expect(face?.tagName.toLowerCase()).toBe('circle')
    // 圆形脸部：cx=cy 且 r>0，脸心位于 viewBox 中心
    expect(face?.getAttribute('cx')).toBe('100')
    expect(face?.getAttribute('cy')).toBe('100')
    expect(Number(face?.getAttribute('r'))).toBeGreaterThan(0)
    // 眼睛位于脸部上部（cy 小于脸心 cy=100）
    const eyes = container.querySelectorAll<SVGCircleElement>('[data-testid^="eye-"]')
    expect(eyes.length).toBe(2)
    eyes.forEach((eye) => {
      expect(Number(eye.getAttribute('cy'))).toBeLessThan(100)
    })
  })

  it('嘴角为下垂弧线：位于脸部下部且端点低于曲线中部', () => {
    const { container } = render(<App />)
    const mouth = container.querySelector<SVGPathElement>('[data-testid="mouth"]')
    expect(mouth).not.toBeNull()
    const d = mouth?.getAttribute('d') ?? ''
    // 二次贝塞尔：端点 y=142，控制点 y=116（中部上拱 → 嘴角下垂）
    const ys = [...d.matchAll(/(\d+(?:\.\d+)?)/g)]
      .map((m) => Number(m[1]))
      .filter((n) => n > 50 && n < 190)
    expect(ys).toContain(142)
    expect(ys.some((y) => y < 142)).toBe(true)
    // 端点 y=142 大于脸心 y=100，位于脸部下部
    expect(142).toBeGreaterThan(100)
  })

  it('泪滴位于左眼下方垂落', () => {
    const { container } = render(<App />)
    const tear = container.querySelector<SVGPathElement>('[data-testid="tear"]')
    expect(tear).not.toBeNull()
    expect(tear?.getAttribute('fill')).toBe('#6EC1E4')
    // 泪滴起点贴近左眼下缘（左眼 cy=86 + r=13 = 99）
    expect(tear?.getAttribute('d')).toContain('M 64 101')
  })
})
