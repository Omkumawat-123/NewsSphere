import React, { Component } from 'react'
import  sipnner from './spinner.gif'

export class Sipnner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={sipnner} alt="Loading" />
      </div>
    )
  }
}

export default Sipnner
