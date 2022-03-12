import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { New, Question, Questions } from './pages'

function App () {
  return (
    <div>
      <nav>
        <Link to='/' style={styles.navLink}>Home</Link>
        <Link to='/new' style={styles.navLink}>New</Link>
      </nav>

      <Routes>
        <Route path='/' element={<Questions />} />
        <Route path='/new' element={<New />} />
        <Route path='/question/:id' element={<Question />} />
      </Routes>
    </div>
  )
}

export default App

const styles = {
  navLink: {
    padding: 8,
    color: 'black',
    textDecoration: 'none'
  }
}
