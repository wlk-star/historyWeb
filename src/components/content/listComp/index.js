import { useEffect, useState, useRef, useCallback } from 'react'
import '../style.scss'
import './style.scss'
import img from '../../../common/images/img.jpg'
import close from '../../../common/images/close.png'
import arrow from '../../../common/images/arrowRight.png'
import {
  SwitchTransition,
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'
let maxDistant
const ListComp = () => {
  const listRef = useRef(0)
  const [distant, setDistant] = useState(0)
  const [detailShow, setDetailShow] = useState(false)
  const [showIndex, setShowIndex] = useState(0)
  useEffect(() => {
    maxDistant =
      listRef.current.clientWidth - document.documentElement.clientWidth
  }, [])
  const detail = (index) => {
    setShowIndex(index)
    setDetailShow(true)
    console.log(index)
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
            <p>
              6 May – Janina Kilian-Stanisławska, art historian and illustrator
              deported from Lvov to the Soviet Union in 1940, establishes the
              Blue Almonds Polish Puppet Theatre in Samarkand, operating under
              the auspices of the Uzbek State Philharmonic in Tashkent.
            </p>
            <p>
              (Madam Twardowska) inaugurating the Blue Almonds Theatre under the
              artistic direction of the institution’s founder.
            </p>
          </li>
        </CSSTransition>
      </div>
      <h2>1945-66</h2>
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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
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
                    <img src={img} />
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
                  <span>2000</span>
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
