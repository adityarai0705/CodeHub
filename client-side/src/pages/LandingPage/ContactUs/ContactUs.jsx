import React from 'react';
import './ContactUs.css';
import Footer from '../../../components/Footer/Footer';

export default function ContactUs() {

  //SUBMIT FUNCTION
  const demoFunction = (e) => {
    e.preventDefault();
    console.log("Submit Buttton Working");
  }


  return (
    <>
    <section id="contactpageid">
      <div id='contactheadlinecontainer'>
        <h1 className="contact12headline">ContactUs</h1>
      </div>
      <div id='contact-boxContactusid' >
        <form>
          <input type="text" placeholder='Enter your name' name='name' />
          <input type="email" placeholder='Email' name='email' />
          <textarea type="text" id='Contactmsg' placeholder='Enter your message' name='message' cols="30" rows="10" />
          <button className='ContactUspagebtn' onClick={(e) => { demoFunction(e) }}>Submit</button>
        </form>
      </div>
    </section>
    <Footer />
    </>
  )
}
