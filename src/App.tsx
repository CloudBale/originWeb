import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown, ArrowRight, BriefcaseBusiness, Code2, Compass,
  Cpu, Gamepad2, Lightbulb, MapPin, Menu, MessageCircle, Rocket,
  PlayCircle, Sparkles, Target, Users, X, Zap,
} from 'lucide-react'

const wechatApplicationQr = `${import.meta.env.BASE_URL}images/wechat-application.jpg`
const originLogo = `${import.meta.env.BASE_URL}images/origin-lab-logo-future-sigil-v5.png`

const nav = [
  ['关于', 'about'], ['你将获得', 'benefits'], ['项目', 'projects'],
  ['期待的你', 'requirements'], ['加入', 'join'],
]

const benefits = [
  { icon: Compass, no: '01', title: '方向与规划', text: '结合兴趣、基础与行业岗位，找到适合自己的成长坐标。' },
  { icon: Code2, no: '02', title: '技术与创意', text: '接触 Unity、UE、C#、Python、AI 编程与产品创意。' },
  { icon: BriefcaseBusiness, no: '03', title: '真实项目', text: '从学习任务走向竞赛、课题与适合的商业项目实践。' },
  { icon: Users, no: '04', title: '导师与同伴', text: '获得针对性指导，在稳定的小团队中彼此推动成长。' },
  { icon: Target, no: '05', title: '作品与交付', text: '不止于“学过”，逐步积累能够展示、运行和交付的成果。' },
  { icon: Rocket, no: '06', title: '提前入行', text: '了解岗位、协作与项目流程，让职业探索从大学第一年开始。' },
]

const workCategories = [
  ['all', '全部精选'], ['vr', '沉浸式 VR'], ['ar', 'AR × AI'], ['game', '游戏与交互'],
] as const

const projects = [
  { title: 'VR射击肉鸽游戏 Demo', category: 'vr', categoryName: '沉浸式 VR', description: '融合射击、随机成长与空间交互的虚拟现实玩法原型。', tags: ['VR', '游戏原型', '交互设计'], duration: '01:58', image: 'vr-roguelike.jpg', bvid: 'BV1Sxhc6AEdj' },
  { title: 'AR虚拟对话AI', category: 'ar', categoryName: 'AR × AI', description: '让虚拟角色进入真实空间，并尝试自然语言对话体验。', tags: ['AR', 'AI对话', '虚拟角色'], duration: '01:39', image: 'ar-ai-dialogue.jpg', bvid: 'BV18xhc6AE7x' },
  { title: 'VR初中物理实验', category: 'vr', categoryName: '沉浸式 VR', description: '把抽象实验转化为可观察、可操作的沉浸式学习场景。', tags: ['VR', '教育应用', '仿真实验'], duration: '04:50', image: 'vr-physics.jpg', bvid: 'BV1Dxhc6AExE' },
  { title: 'AR休闲音乐鲸鱼', category: 'ar', categoryName: 'AR × AI', description: '在现实环境中营造轻量、治愈的虚实融合互动体验。', tags: ['AR', '创意体验', '空间交互'], duration: '02:38', image: 'ar-whale.jpg', bvid: 'BV1Dxhc6AExg' },
  { title: '跑酷游戏 · 勇往直前', category: 'game', categoryName: '游戏与交互', description: '围绕移动节奏、关卡挑战与即时反馈完成的跑酷作品。', tags: ['Unity', '跑酷', '关卡设计'], duration: '01:18', image: 'parkour.jpg', bvid: 'BV1Dxhc6AEvb' },
  { title: '红绿灯驾驶模拟程序', category: 'game', categoryName: '游戏与交互', description: '结合交通规则和驾驶操作，完成可运行的模拟训练程序。', tags: ['模拟驾驶', '程序开发', '场景交互'], duration: '05:34', image: 'driving-simulator.jpg', bvid: 'BV18xhc6AE4w' },
] as const

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'))
    }, { threshold: 0.12 })
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [qrOpen, setQrOpen] = useState(false)
  const [workCategory, setWorkCategory] = useState<(typeof workCategories)[number][0]>('all')
  const heroRef = useRef<HTMLElement>(null)
  useReveal()

  useEffect(() => {
    const el = heroRef.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
      el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
    }
    el.addEventListener('pointermove', move)
    return () => el.removeEventListener('pointermove', move)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return <>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="返回首页">
        <img className="brand-logo" src={originLogo} alt="" />
        <span className="brand-name">ORIGIN <b>LAB</b><small>南昌科技职业大学 · 信息工程学院</small></span>
      </a>
      <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="主要导航">
        {nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
        <button className="nav-join" onClick={() => { setQrOpen(true); closeMenu() }}>申请加入</button>
      </nav>
      <button className="menu-btn" aria-label="打开菜单" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>

    <main>
      <section className="hero" id="top" ref={heroRef}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="orbit orbit-a" aria-hidden="true" /><div className="orbit orbit-b" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><span>2026</span> 信息工程学院 · 院内学生招募</div>
          <h1><span>原点</span><br />工作室</h1>
          <p className="slogan">只争朝夕<span className="blink">_</span></p>
          <p className="hero-intro">从兴趣出发，把想法做成作品。<br />在实践中积累能力，提前探索职业方向。</p>
          <div className="hero-actions">
            <button className="button primary" onClick={() => setQrOpen(true)}>从原点出发 <ArrowRight /></button>
            <a className="button ghost" href="#about">了解更多 <ArrowDown /></a>
          </div>
        </div>
        <div className="coordinate" aria-hidden="true">
          <img className="hero-logo" src={originLogo} alt="" />
          <div className="axis axis-x" /><div className="axis axis-y" />
          <div className="core"><span /><i /></div>
          <span className="coord-label label-x">CAREER / X</span>
          <span className="coord-label label-y">GROWTH / Y</span>
          <span className="origin-tag">O ( 0, 0 )</span>
          <span className="float-tag tag-a">TECH</span><span className="float-tag tag-b">IDEA</span>
          <span className="float-tag tag-c">PROJECT</span>
        </div>
        <div className="hero-status">
          <div><b>≤ 6</b><span>本期名额</span></div>
          <div><b>24H</b><span>开放空间</span></div>
          <div><b>NOW</b><span>招满为止</span></div>
        </div>
      </section>

      <section className="section statement" id="about">
        <div className="section-index">01 / ORIGIN</div>
        <div className="statement-copy" data-reveal>
          <p className="kicker">WHY ORIGIN LAB?</p>
          <h2>你不必现在就很优秀，<br /><em>但需要愿意认真开始。</em></h2>
          <p>原点工作室由教师发起并负责，获得学校正式认可与支持。这里不是偶尔参加活动的兴趣群，而是一个有老师带领、有同伴同行、有任务也有作品的小型成长团队。</p>
        </div>
        <div className="manifesto" data-reveal>
          <span>课堂之外</span><ArrowRight /><span>真实项目</span><ArrowRight /><span>未来职业</span>
        </div>
      </section>

      <section className="section benefits-section" id="benefits">
        <header className="section-head" data-reveal>
          <div><p className="kicker">WHAT YOU GET</p><h2>在这里，成长有迹可循</h2></div>
          <p>明确方向，持续学习，以项目检验能力。每一步都留下可以看见的坐标。</p>
        </header>
        <div className="benefit-grid">
          {benefits.map(({ icon: Icon, no, title, text }) => <article className="benefit-card" key={title} data-reveal>
            <span className="card-no">{no}</span><Icon /><h3>{title}</h3><p>{text}</p><span className="card-line" />
          </article>)}
        </div>
      </section>

      <section className="section path-section">
        <div className="path-title" data-reveal><p className="kicker">YOUR TRAJECTORY</p><h2>一条从兴趣到专业的轨迹</h2></div>
        <div className="path" data-reveal>
          {['找到方向', '训练技能', '参与项目', '走向真实'].map((x, i) => <div className="path-step" key={x}>
            <span>{String(i + 1).padStart(2, '0')}</span><i /><b>{x}</b>
          </div>)}
        </div>
      </section>

      <section className="section projects-section" id="projects">
        <header className="section-head" data-reveal>
          <div><p className="kicker">SELECTED WORKS</p><h2>学生作品与实践项目</h2></div>
          <p>从课程原型到真实项目，每一份作品，都是能力成长的记录。</p>
        </header>
        <div className="work-toolbar" data-reveal>
          <div className="work-filters" role="group" aria-label="筛选作品方向">
            {workCategories.map(([value, label]) => <button key={value} className={workCategory === value ? 'active' : ''} aria-pressed={workCategory === value} onClick={() => setWorkCategory(value)}>{label}</button>)}
          </div>
          <span>6 SELECTED / 15 TOTAL</span>
        </div>
        <div className="project-grid" key={workCategory}>
          {projects.filter((p) => workCategory === 'all' || p.category === workCategory).map((p, i) => <a className={`project-card ${i === 0 ? 'featured' : ''}`} key={p.title} href={`https://www.bilibili.com/video/${p.bvid}/`} target="_blank" rel="noreferrer" aria-label={`在B站观看《${p.title}》`}>
            <div className="project-art"><img src={`${import.meta.env.BASE_URL}images/works/${p.image}`} alt="" /><span className="video-duration">{p.duration}</span><span className="video-play"><PlayCircle /></span></div>
            <div className="project-info"><span>{p.categoryName}</span><h3>{p.title}</h3><p>{p.description}</p><div className="project-tags">{p.tags.map((tag) => <b key={tag}>{tag}</b>)}</div></div>
            <span className="project-link">BILIBILI <ArrowRight /></span>
          </a>)}
        </div>
        <div className="all-works" data-reveal><p>这里展示的是部分代表作品，更多游戏、VR、AR与交互项目收录在完整合集中。</p><a href="https://space.bilibili.com/26688667/lists/8943382?type=season" target="_blank" rel="noreferrer">查看全部 15 个作品 <ArrowRight /></a></div>
      </section>

      <section className="section mentor-section">
        <div className="mentor-visual" data-reveal>
          <div className="mentor-profile-card">
            <div className="profile-scan" aria-hidden="true" />
            <div className="profile-code"><span>MENTOR / 001</span><i>ORIGIN LAB</i></div>
            <div className="profile-name"><Cpu /><p><small>XIONG XUAN</small><b>熊旋</b></p></div>
            <div className="profile-metrics">
              <div><b>6+</b><span>企业一线经验 / 年</span></div>
              <div><b>4</b><span>开发与产品角色</span></div>
            </div>
            <div className="profile-track"><span>GAME DEV</span><span>VR / AR</span><span>AI PRODUCT</span><span>EDUCATION</span></div>
          </div>
          <div className="tech-tags"><span>UNITY</span><span>UNREAL</span><span>C#</span><span>PYTHON</span><span>AI</span></div>
        </div>
        <div className="mentor-copy" data-reveal>
          <p className="kicker">ABOUT THE MENTOR</p><h2>从企业一线，走进职业教育</h2>
          <div className="mentor-identity"><b>熊旋</b><span>南昌科技职业大学 · 信息工程学院专业课教师</span></div>
          <p>计算机科学与技术专业背景，拥有6年以上企业开发与产品工作经验，先后从事游戏前端开发、VR开发、产品策划及AI产品管理工作。</p>
          <p>熟悉手游、VR/AR及商业项目开发流程，掌握Unity、UE、C#、Python及AI辅助编程等技术，希望帮助愿意行动的同学少走一些弯路。</p>
          <a className="bilibili-link" href="https://space.bilibili.com/26688667?spm_id_from=333.1007.0.0" target="_blank" rel="noreferrer">
            <PlayCircle />
            <span><b>在 Bilibili 看我的视频教程</b><small>课程与技术内容持续更新</small></span>
            <ArrowRight />
          </a>
        </div>
      </section>

      <section className="section requirements" id="requirements">
        <header data-reveal><p className="kicker">WHO WE ARE LOOKING FOR</p><h2>寻找认真生活的<span>同行者</span></h2><p>基础可以从零开始，态度不能从零开始。</p></header>
        <div className="traits" data-reveal>
          {['真实的兴趣', '稳定的投入', '接受反馈', '按时交付', '团队责任', '不愿虚度'].map((x, i) => <div key={x}><span>0{i + 1}</span><b>{x}</b></div>)}
        </div>
        <aside data-reveal><Zap /><p><b>加入前请确认</b><br />工作室原则上全天开放。我们希望成员在工作日无课时间，将这里作为主要的学习与实践场所。来去自由，但已承担的任务应完成或妥善交接。</p></aside>
      </section>

      <section className="section join" id="join">
        <div className="join-light" aria-hidden="true" />
        <div className="join-copy" data-reveal>
          <p className="kicker">START FROM HERE</p><h2>你的大学，<br />从这个原点重新出发。</h2>
          <p>本期招募不超过6人，暂不设置截止日期，招满为止。</p>
          <button className="button primary" onClick={() => setQrOpen(true)}>申请加入 <ArrowRight /></button>
        </div>
        <div className="join-data" data-reveal>
          <div><span>招募人数</span><b>≤ 6 人</b></div>
          <div><span>工作室地点</span><b><MapPin />科学馆一楼 E 面<br />省重点实验室办公室</b></div>
          <div><span>通知方式</span><b><MessageCircle />通过报名信息联系</b></div>
        </div>
      </section>
    </main>

    <footer><div className="brand"><img className="brand-logo" src={originLogo} alt="原点工作室Logo" /><span>ORIGIN <b>LAB</b></span></div><p>南昌科技职业大学 · 信息工程学院<br />原点工作室 · 只争朝夕</p><span>© 2026</span></footer>

    <button className="mobile-cta" onClick={() => setQrOpen(true)}><Sparkles /> 申请加入</button>

    {qrOpen && <div className="modal" role="dialog" aria-modal="true" aria-label="申请加入原点工作室" onClick={() => setQrOpen(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setQrOpen(false)} aria-label="关闭"><X /></button>
        <span className="modal-kicker">JOIN ORIGIN LAB</span><h2>从原点出发</h2>
        <div className="qr-code"><img src={wechatApplicationQr} alt="原点工作室微信报名二维码" /></div>
        <p>使用微信扫码填写报名信息<br /><small>提交后，我们将通过报名信息与你联系</small></p>
      </div>
    </div>}
  </>
}

export default App
