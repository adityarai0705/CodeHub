import React from 'react';
import './Footer.css';
import NiTLogo from './NiTLogo.png';
import CTLogo from './CTmonoChrome.png';

export default function Footer() {
  const today=new Date();
  const year=today.getFullYear();
  return (
    <div className='FooterContainer'>
        <div className='footerTitle'>
            <div style={{display : 'flex', flexDirection : 'row', marginRight : '4px'}}> &#169;{year} <span className='desktopHidden'>Copyrights reserved</span> </div>
            <div> CodeTogether </div> 
            <div className='mobileHidden'> <h4 style={{padding : '0', margin : '0', marginLeft : '4px', marginRight : '4px'}}><b>|</b></h4> </div> 
            <a className='FooterLink' href='https://www.nit.ac.in/'> Narula Institute of Technology</a>
        </div>
        <div>
            <img height={'50px'} width={'50px'} style={{margin : '20px'}} src={CTLogo} />
            <img height={'50px'} width={'80px'} style={{margin : '20px'}} src={NiTLogo} />
        </div>
    </div>
  )
}
