import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import AuthDropdown from '../../components/AuthDropdown/AuthDropdown';

class Navigation extends Component {
  static contextType = AuthContext;

  state = {
    collapsed: true
  }

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { user } = this.context;
    const { collapsed } = this.state;
    const targetClass = `collapse navbar-collapse ${!collapsed && 'show'}`;
    const togglerClass = `navbar-toggler ${collapsed && 'collapsed'}`;

    return (
      <div className='Navigation'>


        {/* <nav class="mb-1 navbar navbar-expand-lg navbar-dark orange lighten-1">


          <Link className='navbar-brand' to='/'>Unknown Heroes</Link>
          <button className={togglerClass} onClick={this.toggleCollapse} data-target="#navbarSupportedContent-555"
            aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent-555">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link className='navbar-brand' to='/'>Home</Link>
                <span class="sr-only">(current)</span>
              </li>

              <li class="nav-item">
                <Link className='navbar-brand' to='/character'>Character</Link>
              </li>
              <li class="nav-item">
                <Link className='navbar-brand' to='/results'>Results</Link>
              </li>
            </ul>



            <ul className='navbar-nav'>
              {user
                ? <AuthDropdown onClick={this.toggleCollapse} />
                : <>

                  <li className='nav-item'><Link className='nav-link' to='/login' onClick={this.toggleCollapse}>Login</Link></li>
                  <li className='nav-item'><Link className='nav-link' to='/register' onClick={this.toggleCollapse}>Register</Link></li>
                </>}


            </ul>

          </div>
        </nav> */}


        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <Link className='navbar-brand' to='/'>Unknown Heroes</Link>
          <button className={togglerClass} onClick={this.toggleCollapse} data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className={targetClass} id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to='/' onClick={this.toggleCollapse}>Home</Link>
              </li>
              {user &&
                <li className='nav-item'>
                  <Link className='nav-link' to='/character' onClick={this.toggleCollapse}>Character</Link>
                </li>}
              {user &&
                <li className='nav-item'>
                  <Link className='nav-link' to='/results' onClick={this.toggleCollapse}>Results</Link>
                </li>}

                {user &&
                <li className='nav-item'>
                  <Link className='nav-link' to='/gameover' onClick={this.toggleCollapse}>Gameover</Link>
                </li>}

            </ul>
            <ul className='navbar-nav'>
              {user
                ? <AuthDropdown onClick={this.toggleCollapse} />
                : <>
                  <li className='nav-item'><Link className='nav-link' to='/login' onClick={this.toggleCollapse}>Login</Link></li>
                  <li className='nav-item'><Link className='nav-link' to='/register' onClick={this.toggleCollapse}>Register</Link></li>
                </>}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;
