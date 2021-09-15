import { useEffect, useState, useRef, useCallback } from 'react'
import {
  SwitchTransition,
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'
import './style.scss'
import VideoComp from './videoComp'
import ListComp from './listComp'


let finisheExit = true

function Content(props) {



  const [finishOther, setFinishOther] = useState(false)



  return (
    // <div className="content_container">
    <TransitionGroup>
      {props.activeIndex === 0 && finisheExit ? (
        <CSSTransition
          // in={props.activeIndex === 0}
          unmountOnExit={true}
          classNames={'slide'}
          timeout={1000}
          onEntered={() => {
            finisheExit = false
          }}
          onExited={() => {
            finisheExit = true
            setFinishOther(!finishOther)
            console.log('退出动画结束')
          }}
        >
          <VideoComp />
        </CSSTransition>
      ) : props.activeIndex !== 0 && finisheExit ? (
        <CSSTransition
          unmountOnExit={true}
          classNames={'slide'}
          timeout={1000}
          appear={true}
          onEntered={() => {
            finisheExit = false
          }}
          onExited={() => {
            finisheExit = true
            setFinishOther(!finishOther)
            console.log('退出动画结束')
          }}
        >
          <ListComp />
        </CSSTransition>
      ) : null}
    </TransitionGroup>
    // </div>
  )
}
export default Content
