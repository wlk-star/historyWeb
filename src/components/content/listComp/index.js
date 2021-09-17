import { useEffect, useState, useRef, useCallback } from 'react'
import '../style.scss'
import './style.scss'
import close from '../../../common/images/close.png'
import arrow from '../../../common/images/arrowRight.png'
import { CSSTransition } from 'react-transition-group'

const ListComp = (props) => {
  const listRef = useRef(0)
  const [maxDistant, setMaxDistant] = useState(0)
  const [distant, setDistant] = useState(0)
  const [detailShow, setDetailShow] = useState(false)
  const [showIndex, setShowIndex] = useState(0)
  const [eventsList, setEventsList] = useState([])
  useEffect(() => {
    setMaxDistant(
      listRef.current.clientWidth - document.documentElement.clientWidth
    )

    fetch(`http://localhost:3005/history/events?periodId=1`, {
      //请求方式
      method: 'GET',
    }).then(function (response) {
      if (response.status === 200) {
        response.json().then(function (res) {
          //获取请求的返回字段
          console.log(res.data)
          setEventsList(res.data)
        })
      } else {
        alert('网络请求错误')
      }
    })
  }, [])
  useEffect(() => {
    fetch(`http://localhost:3005/history/events?periodId=${props.eventIndex}`, {
      //请求方式
      method: 'GET',
    }).then(function (response) {
      if (response.status === 200) {
        response.json().then(function (res) {
          //获取请求的返回字段
          console.log(res.data)
          setEventsList(res.data)
        })
      } else {
        alert('网络请求错误')
      }
    })
  }, [props.eventIndex])
  // 每次更新都会执行
  useEffect(() => {
    setMaxDistant(
      listRef.current.clientWidth - document.documentElement.clientWidth
    )
  })
  const detail = (index) => {
    setShowIndex(index)
    setDetailShow(true)
    // console.log(index)
  }
  const closeDetail = () => {
    setDetailShow(false)
  }
  return (
    <div className="content_container" style={{}}>
      <div
        className="btn_side btn_side_left"
        style={{
          left: distant === 0 ? '-100px' : null,
        }}
        onClick={() => {
          setDistant(distant + 800 > 0 ? 0 : distant + 800)
        }}
      >
        <img src={arrow}></img>
      </div>
      <div
        className="btn_side btn_side_right"
        style={{
          right: distant === -maxDistant ? '-100px' : null,
        }}
        onClick={() => {
          setDistant(distant - 800 < -maxDistant ? -maxDistant : distant - 800)
        }}
      >
        <img src={arrow}></img>
      </div>
      <div
        className="history_detail"
        style={{
          transform: detailShow ? null : ['translateX(100%)'],
        }}
      >
        <button onClick={closeDetail}>
          <img src={close}></img>
        </button>
        <CSSTransition
          in={detailShow}
          unmountOnExit={true}
          classNames={'fade'}
          timeout={1000}
        >
          <li>
            <h1>{eventsList.length > 0 ? eventsList[showIndex].title : ''}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: `${
                  eventsList.length > 0 ? eventsList[showIndex].content : ''
                }`,
              }}
            />
          </li>
        </CSSTransition>
      </div>
      <h2>{`${props.period.startYear}-${props.period.endYear.substring(2,4)}`}</h2>
      <ul
        className="content"
        ref={listRef}
        style={{
          left: detailShow ? '0px' : `${distant}px`,
          //   transform: detailShow ? ['matrix(1, 0, 0, 1, 141.266, 0)'] : null,
          // right:`0px`
          //   calc(100vh - 106px)
          padding: detailShow ? 0 : null,
          transform: detailShow
            ? [`translateX(${13.75 - 22.5 * showIndex}vw)`]
            : null,
        }}
      >
        {eventsList.map((item, index) => {
          //  "a".substring()
          return (
            <li
              key={index}
              className="content_item"
              style={{
                bottom: detailShow ? '12%' : index % 2 === 0 ? '22.5%' : '10%',
                transform: detailShow
                  ? index < showIndex
                    ? [`translateX(-20vw)`]
                    : index > showIndex
                    ? [`translateX(20vw)`]
                    : null
                  : null,
                opacity: detailShow && showIndex !== index ? 0 : 1,
              }}
            >
              <div
                className="history_pic"
                style={
                  showIndex === index && detailShow
                    ? {
                        width: '220%',
                        bottom: '8px',
                        height: '50vh',
                        marginTop: '-10px',
                      }
                    : null
                }
              >
                <figure
                  style={
                    detailShow && showIndex === index
                      ? {
                          bottom: '50%',
                          transform: ['translate(-50%,50%)'],
                        }
                      : null
                  }
                >
                  <a onClick={() => detail(index)}>
                    <img src={item.imgSrc===""?'http://localhost:3005/static/images/noPicture.png':item.imgSrc} />
                  </a>
                </figure>
              </div>
              <div
                className="history_time"
                style={{
                  '--scaleValue': detailShow && showIndex === index ? 1 : 0.8,
                }}
              >
                <a onClick={() => detail(index)}>
                  <span>{item.year}</span>
                </a>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default ListComp
