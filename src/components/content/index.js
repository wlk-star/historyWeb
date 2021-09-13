import { useEffect, useState, useRef, useCallback } from 'react'
import {
  SwitchTransition,
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'
import './style.scss'
import img from '../../common/images/img.jpg'
import videoImage from '../../common/images/video.jpg'
import arrow from '../../common/images/arrowRight.png'
import qfl from '../../common/images/qfl.mp4'
let maxDistant
let video_ele
function Content(props) {
  const listRef = useRef(0)
  const [distant, setDistant] = useState(0)
  const [play, setPlay] = useState(false)
  const [finish0, setFinish0] = useState(true)
  const [finishOther, setFinishOther] = useState(1)
  useEffect(() => {
    maxDistant =
      listRef.current.clientWidth - document.documentElement.clientWidth
    video_ele = document.getElementById('video')
  }, [])
  console.log('maxDistant', maxDistant)
  console.log('distant', distant)
  return (
    <div className="content_container">
      <div
        className="btn_side btn_side_right"
        style={{
          right: distant === 0 ? null : '-100px',
        }}
        onClick={() => {
          setDistant(-maxDistant)
        }}
      >
        <img src={arrow}></img>
      </div>

      <div
        className="btn_side btn_side_left"
        style={{
          left: distant === 0 ? '-100px' : null,
        }}
        onClick={() => {
          setDistant(0)
        }}
      >
        <img src={arrow}></img>
      </div>

      <h2>1945-66</h2>
      <ul
        className="content"
        ref={listRef}
        style={{
          left: `${distant}px`,
          // right:`0px`
          // transform:[`translateX(${distant}px)`]
        }}
      >
        {/* viedio */}
        {/* {props.activeIndex === 0 ? ( */}
        <TransitionGroup className="content">
          {props.activeIndex === 0 && finishOther===0 ? (
            <CSSTransition
              // in={props.activeIndex === 0}
              unmountOnExit={true}
              classNames={'slide'}
              timeout={1000}
              // onEntered={() => {
              //   setFinishOther(false)
              // }}
              onExited={() => {
                console.log('exit')
                setFinishOther(props.activeIndex)
              }}
            >
              <li
                className="content_item"
                style={{
                  bottom: '50%',
                  minWidth: '720px',
                  marginBottom: '-300px',
                  // transform: ['translate(0, 100%)'],
                }}
              >
                <div className="history_video">
                  <figure>
                    <video id="video" src={qfl} controls></video>
                  </figure>
                </div>
                <button
                  onClick={() => {
                    if (!play) {
                      video_ele.play()
                      setPlay(true)
                    } else {
                      video_ele.pause()
                      setPlay(false)
                    }
                  }}
                >
                  <span className={play ? 'pauseSpan' : null}>Play video</span>
                </button>
              </li>
            </CSSTransition>
          ) : props.activeIndex !== 0 && finishOther===props.activeIndex ? (
            [1, 2, 3, 4, 5].map((item, index) => {
              return (
                <CSSTransition
                  key={index}
                  // in={props.activeIndex !== 0}
                  unmountOnExit={true}
                  classNames={'slide'}
                  timeout={1000}
                  appear={true}
                  // onEnter={() => {
                  //   setFinishOther(false)
                  // }}
                  onEntered={() => {
                    // setFinishOther(false)
                  }}
                  onExited={() => {
                    console.log('exit',props.activeIndex)
                    setFinishOther(props.activeIndex)
                  }}
                >
                  <li
                    key={index}
                    className="content_item"
                    style={{
                      bottom: index % 2 === 0 ? '22.5%' : '10%',
                    }}
                  >
                    <div className="history_pic">
                      <figure>
                        <a>
                          <img src={img} />
                        </a>
                      </figure>
                    </div>
                    <div className="history_time">
                      <a>
                        <span>2000</span>
                      </a>
                    </div>
                  </li>
                </CSSTransition>
              )
            })
          ) : null}
        </TransitionGroup>
      </ul>
    </div>
  )
}
export default Content
