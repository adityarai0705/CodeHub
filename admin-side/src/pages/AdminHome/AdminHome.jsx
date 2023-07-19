import React from 'react'
import CTAdmin from '../../components/CTAdmin'
import './AdminHome.css'
import ButtonPlain from '../../components/ButtonPlain/ButtonPlain'

export default function AdminHome() {
  return (
    <>
        <CTAdmin />
        <div className='AdminHomeContainer'>
            <ButtonPlain text={"Noticeboard"} />
            <ButtonPlain text={"EducationSection"} />

        </div>
    </>
  )
}
