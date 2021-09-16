import { Fragment, useEffect, useState, useRef, useCallback } from 'react'
import './App.scss'
import {
  SwitchTransition,
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'
import Header from './components/header'
import Content from './components/content'
import Footer from './components/footer'
import Wrapper from './components/Wrapper'
import { Route, Switch } from 'react-router-dom'

function App() {
  const [show, setShow] = useState(true)
  const [footerMsg, setFooterMsg] = useState({
    index: 1,
    period: {
      startYear: '1839',
      endYear: '1860',
    },
  })
  const [friends, setFriends] = useState([])
  let add
  useEffect(() => {
    add = () =>
      setTimeout(() => {
        console.log('a', friends)
        setFriends([...friends, 'coderwhy'])
      }, 500)
  }, [friends])
  const _onFooterChange = (index, period) => {
    setFooterMsg({ index, period })
    console.log({ index, period })
  }
  return (
    <Fragment>
      <Wrapper>
        {/* <Header></Header> */}
        {/* <div style={{
          display:'flex',
          flexDirection:'row',
        }}>
        <CSSTransition
            in={show}
            timeout={500}
            classNames={'slide'}
            unmountOnExit={true}
            appear={true}
          >
            <div style={{
              height:100,
              width:100,
              backgroundColor:'red',
            }} />
          </CSSTransition>
        </div>
  
          <button onClick={() => {
            setShow(!show)
          }}>toggle</button> */}
        {/* <TransitionGroup>
          {friends.map((item, index) => {
            return (
              <CSSTransition classNames="friend" timeout={300} key={index}>
                <div>{item}</div>
              </CSSTransition>
            )
          })}
          <button
            onClick={add}
          >
            addFriend
          </button>
          <button
            onClick={() => {
              friends.pop()
              setFriends([...friends])
            }}
          >
            --Friend
          </button>
        </TransitionGroup> */}
        <Content
          activeIndex={footerMsg.index}
          period={footerMsg.period}
        ></Content>
        <Footer onFooterChange={_onFooterChange}></Footer>
      </Wrapper>

      {/* <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/share" component={Share} />
          <Route exact path="/life" component={Life} />
        </Switch> */}
    </Fragment>
  )
}

export default App
