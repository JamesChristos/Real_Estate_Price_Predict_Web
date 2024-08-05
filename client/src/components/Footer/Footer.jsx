import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div className="f-wrapper">
        <dic className="paddings innerWidth flexCenter f-container">
            {/* Left Side */}
            <div className="flexColStart f-left">
            <div className="flexStart footer-logo">
                <img className="logo-header" src="./7298.png" alt="logo" />
                <span className='logo-name'>UrbanRealty</span>
            </div>

                <span className='secondaryText'>
                    Our Vision is to make all people <br />
                    the best place to live for them.
                </span>
            </div>

            <div className="flexColStart f-right">
                <span className="primaryText">Information</span>
                <span className='secondaryText'>Royal University of Phnom Penh</span>
                <div className="flexCenter f-menu">
                    <span>Home</span>
                    <span>Services</span>
                    <span>Residences</span>
                    <span>Contact</span>
                </div>
            </div>
        </dic>
    </div>
  )
}

export default Footer