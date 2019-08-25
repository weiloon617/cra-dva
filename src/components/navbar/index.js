import React, { useEffect, useState } from 'react'

// Antd Component
import { Menu } from 'antd'

// Styling
import './index.less'

// Dva
import { Link } from 'dva/router'

const NavBar = () => {
  const [current, setCurrent] = useState('home')
  const [position, setPosition] = useState(0)

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)

    return () => {
      window.removeEventListener('scroll', listenToScroll)
    }
  }, [])

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight

    const scrolled = winScroll / height

    setPosition(scrolled)
  }

  const clickHandler = event => setCurrent(event.key)

  return (
    <div
      className={`nav-bar-wrapper ${
        position === 0 ? 'scroll-top' : 'scroll-bottom'
      }`}
    >
      <div className="container">
        <Menu onClick={clickHandler} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="market">
            <Link to="/login">Market</Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/login">About Us</Link>
          </Menu.Item>
          <Menu.Item key="contact">
            <Link to="/login">Contact Us</Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  )
}

export default NavBar
