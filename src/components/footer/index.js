import { useEffect, useState, useRef, useCallback } from 'react'
import './style.scss'

function Footer(props) {
  const [activeIndex, setActiveIndex] = useState(1)
  const [overState, setOverState] = useState(0)
  const [distant, setDistant] = useState(0)
  const footerRef = useRef(null)
  let animateTimer = null
  let maxDistant = 0
  useEffect(() => {
    // 监听底部
    footerRef.current.addEventListener('mouseover', _handleMouseMove)
    footerRef.current.addEventListener('mouseleave', _handleMouseLeave)
    // window/addEventListener('mouseleave')
    // 可移动的距离
    if (
      maxDistant !==
      document.documentElement.clientWidth - footerRef.current.clientWidth
    ) {
      console.log('offsetLeft', footerRef.current.offsetLeft)
      maxDistant =
        document.documentElement.clientWidth - footerRef.current.clientWidth
    }
    return () => {
      footerRef.current.removeEventListener('mouseover', _handleMouseMove)
      footerRef.current.removeEventListener('mouseleave', _handleMouseLeave)
    }
  }, [overState])
  // useEffect(() => {
  //   // 移动底部
  //   if (overState === 1) {
  //     console.log('right')
  //     if(!animateTimer){
  //       let value = distant
  //       animateTimer = setInterval(() => {
  //         setDistant(value)
  //         if(value+1>maxDistant){
  //           clearInterval(animateTimer)
  //         }else{
  //           value = value +1;
  //         }

  //         // window.requestAnimationFrame(() => {
  //         //   if (distant < maxDistant) {
  //         //     setDistant(distant+20)
  //         //   }
  //         // })
  //       }, 40)
  //     }
  //     console.log(animateTimer);
  //   } else if (overState === 0) {
  //     console.log('stop');
  //     clearInterval(animateTimer)
  //   }
  // }, [overState])

  const _handleMouseMove = (e) => {
    const { x, y } = e

    const devWidth = document.documentElement.clientWidth
    let tempState = 0
    if (x >= 0.8 * devWidth) {
      tempState = 1
    } else if (x <= 0.2 * devWidth) {
      tempState = -1
    } else {
      tempState = 0
    }
    // console.log('tempState', tempState)

    // if (overState !== tempState) {
    // console.log('maxDistant', maxDistant)
    if (tempState === -1) {
      setDistant(0)
    } else if (tempState === 1) {
      setDistant(maxDistant)
    } else {
      let offset = footerRef.current.offsetLeft
      if (overState === -1) {
        offset =
          footerRef.current.offsetLeft + 36 > 0
            ? 0
            : footerRef.current.offsetLeft + 36
      } else if (overState === 1) {
        offset =
          footerRef.current.offsetLeft - 36 < maxDistant
            ? maxDistant
            : footerRef.current.offsetLeft - 36
      }
      setDistant(offset)
    }

    setOverState(() => {
      // console.log('set', tempState)
      return tempState
    })
    // }
  }
  const _handleMouseLeave = (e) => {
    console.log(overState)
    let offset = footerRef.current.offsetLeft
    setDistant(offset)
  }
  console.log('distant', distant)
  return (
    <div
      className="footer"
      ref={footerRef}
      style={{
        // transform: [`translate(${distant}px, 0px)`],
        left: distant,
        transition: overState === 0 ? 'left 1.5s' : 'left 3s',
      }}
      // 事件委托
      onClick={(e) => {
        e.persist()
        console.log(e);
        console.log(e.target.getAttribute('index'));
      //   if(e.target && e.target.nodeName.toUpperCase == "LI") {
      //     // 真正的处理过程在这里
      //     // console.log("List item ",e.target.id.replace("post-")," was clicked!");
      //   }
      //   // setActiveIndex()
      }}
    >
      {[
        0,
        '1927 - 28',
        '1927 - 28',
        '1927 - 28',
        '1927 - 28',
        '1927 - 28',
        '1927 - 28',
        '1927 - 28',
      ].map((value, index) => {
        return (
          <a
            index={index}
            key={`footer${index}`}
            className={
              index === activeIndex ? 'footer_item activeStyle' : 'footer_item'
            }
            onClick={() => {
              setActiveIndex(index)
            }}
          >
            <span
              className={
                index === activeIndex ? 'item_text active_text' : 'item_text'
              }
            >
              {value}
            </span>
            <span
              className="bottomLine"
              style={
                index === activeIndex
                  ? {
                      width: '216px',
                      opacity: 1,
                    }
                  : null
              }
            ></span>
          </a>
        )
      })}
    </div>
  )
}
export default Footer
