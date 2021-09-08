import { useEffect, useState } from 'react'
import './style.scss'

function Wrapper(props) {
  const [scrollTop, setScrollTop] = useState(true)

  useEffect(() => {}, [])
  return (
    <div className="wrapper">
      <div className="backgrounds">
        <div className='colorBlock'></div>
        <div></div>
      </div>
      {props.children}
    </div>
  )
}
export default Wrapper
