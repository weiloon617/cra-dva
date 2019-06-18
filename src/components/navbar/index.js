import React, { Component } from 'react'

// Antd Component
import { Menu } from 'antd'

// Styling
import './index.less'

// Dva
import { Link } from 'dva/router'

class NavBar extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.listenToScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenToScroll)
  }

  state = {
    current: 'home',
    position: 0,
  }

  listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight

    const scrolled = winScroll / height

    this.setState({ position: scrolled })
  }

  handleClick = e => this.setState({ current: e.key })

  render() {
    return (
      <div
        className={`nav-bar-wrapper ${
          this.state.position === 0 ? 'scroll-top' : 'scroll-bottom'
        }`}
      >
        <div className="container">
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
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
}

export default NavBar
