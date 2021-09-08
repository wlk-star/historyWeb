import { Fragment } from 'react'
import './App.scss'
import Header from './components/header'
import Footer from './components/footer'
import Wrapper from './components/Wrapper'
import { Route, Switch } from 'react-router-dom'


function App() {
  return (
    <Fragment>
      <Wrapper>
        <Header></Header>
        <Footer></Footer>
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
