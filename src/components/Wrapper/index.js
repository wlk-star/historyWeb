import { useEffect, useState } from 'react'
import './style.scss'

function Wrapper(props) {
  const [scrollTop, setScrollTop] = useState(true)

  useEffect(() => {}, [])
  return (
    <div className="wrapper">
      <div className="backgrounds">
        <div className='logo'>
          <h2>中国近现代重大历史事件</h2>
          <div>China History</div>
        </div>
        <div className='colorBlock'></div>

      </div>
      {props.children}
    </div>
  )
}
export default Wrapper
