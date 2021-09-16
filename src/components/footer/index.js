import { useEffect, useState, useRef, useCallback } from 'react'
import './style.scss'
import Icon from '../../common/images/videoIcon.png'
function Footer(props) {
  const [activeIndex, setActiveIndex] = useState(1)
  const [overState, setOverState] = useState(0)
  const [distant, setDistant] = useState(0)
  const [devWidth, setDevWidth] = useState(document.documentElement.clientWidth)
  const [dataList, setDataList] = useState([])
  const footerRef = useRef(0)
  let maxDistant = 0
  // let eventPeriodList = [];
  window.onresize = function (e) {
    setDevWidth(document.documentElement.clientWidth)
  }
  useEffect(() => {
    if (document.documentElement.clientWidth < footerRef.current.clientWidth) {
      setOverState(-1)
      setDistant(0)
    }
    fetch('http://localhost:3005/history/period', {
      //请求方式
      method: 'GET',
      //将请求的参数转成json
      // body: JSON.stringify(param),
      //请求头
      headers: {
        'content-type': 'application/json',
      },
    }).then(function (response) {
      if (response.status === 200) {
        response.json().then(function (res) {
          //获取请求的返回字段
          console.log(res)
          // eventPeriodList = data
          setDataList(['vedio', ...res.data])
        })
      } else {
        alert('网络请求错误')
      }
    })
  }, [])
  useEffect(() => {
    // 监听底部
    footerRef.current.addEventListener('mouseover', _handleMouseMove)
    footerRef.current.addEventListener('mouseleave', _handleMouseLeave)

    // 可移动的距离
    if (maxDistant !== devWidth - footerRef.current.clientWidth) {
      console.log('offsetLeft', footerRef.current.offsetLeft)
      maxDistant = devWidth - footerRef.current.clientWidth
    }
    return () => {
      footerRef.current.removeEventListener('mouseover', _handleMouseMove)
      footerRef.current.removeEventListener('mouseleave', _handleMouseLeave)
    }
  }, [overState])

  const _handleMouseMove = (e) => {
    const { x } = e
    // const devWidth = document.documentElement.clientWidth
    let tempState = 0
    if (x >= 0.8 * devWidth) {
      tempState = 1
    } else if (x <= 0.2 * devWidth) {
      tempState = -1
    } else {
      tempState = 0
    }

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

    setOverState(tempState)
    // }
  }
  const _handleMouseLeave = (e) => {
    // console.log(overState)
    let offset = footerRef.current.offsetLeft
    setDistant(offset)
  }
  // console.log('distant', distant)
  return (
    <div
      className="footerContainer"
      // 事件委托
      onClick={(e) => {
        e.persist()
        // console.log(e.target.nodeName)
        let nodeElement = e.target
        if (e.target.nodeName === 'SPAN' || e.target.nodeName === 'IMG') {
          nodeElement = e.target.parentNode
        }
        const index = nodeElement.getAttribute('index')
        if (nodeElement && nodeElement.nodeName === 'A') {
          setActiveIndex(Number(index))

          const { startYear, endYear } = dataList[index]
          // 回调函数
          props.onFooterChange(Number(index), { startYear, endYear })
        }
      }}
    >
      <div
        ref={footerRef}
        className={footerRef.current.clientWidth > devWidth ? 'footer' : ''}
        style={{
          display: 'flex',
          // flex: 1,
          flexDirection: 'row',
          // transform: [`translate(${distant}px, 0px)`],
          left: distant,
          transition: overState === 0 ? 'left 1.5s' : 'left 3s',
        }}
      >
        {dataList.map((item, index) => {
          return (
            <a
              index={index}
              key={`footer${index}`}
              className={
                index === activeIndex
                  ? 'footer_item activeStyle'
                  : 'footer_item'
              }
            >
              {index === 0 ? (
                <img
                  src={Icon}
                  className="vedioIcon"
                  style={{
                    opacity: index === activeIndex ? '1' : null,
                  }}
                ></img>
              ) : (
                <span
                  className={
                    index === activeIndex
                      ? 'item_text active_text'
                      : 'item_text'
                  }
                >
                  {`${item.startYear} - ${item.endYear}`}
                </span>
              )}
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
    </div>
  )
}
export default Footer
