import { useEffect, useState } from 'react'
import Search from '../search'
import './style.scss'
import { debounce } from '../../common/js'
import { Link } from 'react-router-dom'

function Header() {
  const [scrollTop, setScrollTop] = useState(true)
  let handleScroll = function (e) {
    // console.log("scroll",e);
    console.log('window.scrollY', window.scrollY)
    const scrollY = window.scrollY
    if (scrollY > 130) {
      setScrollTop(false)
    } else {
      setScrollTop(true)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', debounce(handleScroll, 100))
    return () => {
      console.log('end')
      window.removeEventListener('scroll', debounce(handleScroll, 100))
    }
  }, [])
  return (
    <div className={scrollTop ? 'header' : 'header header2'}>
      <div className="logo">left Logo</div>
      <div
        className="right"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Search />

        <ul className="nav">
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/share">技术分享</Link>
          </li>
          <li>
            <Link to="/life">生活分享</Link>
          </li>
          <li>
            <Link to="/life">创作</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default Header
