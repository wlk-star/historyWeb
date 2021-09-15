import { useEffect, useState } from 'react'
import './style.scss'

function Wrapper(props) {
  const [scrollTop, setScrollTop] = useState(true)

  useEffect(() => {}, [])
  return (
    <div className="wrapper">
      <div className="backgrounds">
        <div className='logo'>
          <h2>中国近代和中国共产党发展历史</h2>
          <div>China History</div>
        </div>
        <div className='colorBlock'></div>

      </div>
      {props.children}
    </div>
  )
}
export default Wrapper
