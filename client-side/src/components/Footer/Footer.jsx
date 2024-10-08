import React from 'react';
import './Footer.css';
import NiTLogo from './mnnit_logo.png';
import CTLogo from './logo_half.png';

export default function Footer() {
  const today = new Date();
  const year = today.getFullYear();
  return (
    // <div className='FooterContainer'>
    //     <div className='footerTitle'>
    //         <div style={{display : 'flex', flexDirection : 'row', marginRight : '4px'}}> &#169;{year} <span className='desktopHidden'>Copyrights reserved</span> </div>
    //         <div> CodeTogether </div> 
    //         <div className='mobileHidden'> <h4 style={{padding : '0', margin : '0', marginLeft : '4px', marginRight : '4px'}}><b>|</b></h4> </div> 
    //         <a className='FooterLink' href='https://www.nit.ac.in/'> Narula Institute of Technology</a>
    //     </div>
    //     <div>
    //         <img height={'50px'} width={'50px'} style={{margin : '20px'}} src={CTLogo} />
    //         <img height={'50px'} width={'80px'} style={{margin : '20px'}} src={NiTLogo} />
    //     </div>
    // </div>

<footer className="FooterContainer">
  <div className="footerLogo">
    <img className= "ct_logo" src={CTLogo} alt="CodeHub Logo" />
    <img className= "nit_logo" src={NiTLogo} alt="Motilal Nehru National Institute of Technology Logo" />
    <span className="mnnitLabel">MNNIT</span>
  </div>
  <div className="footerTitle">
    <span>&#169; {year} CodeHub. All Rights Reserved.</span>
  </div>
  <div className="LinkContainer">
    <a href="#" className="FooterLink">About</a>
    <a href="#" className="FooterLink">Privacy Policy</a>
    <a href="#" className="FooterLink">Licensing</a>
    <a href="#" className="FooterLink">Contact</a>
  </div>
</footer>

  )
}

