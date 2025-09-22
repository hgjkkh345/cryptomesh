import React, {useState} from "react"

import { hrefs, Medias, routes } from "utils"

import "./Footer.scss"
import logo from "assets/images/cryptomesh-circle.webp"
import { Link, useSearchParams } from "react-router-dom"
import toast from "react-hot-toast";
import {apiOur} from "../../service/api/apiOur";
import {Input} from "../Input";
import {SimpleButton} from "../SimpleButton";

export const Footer = (): JSX.Element => {
  const [search] = useSearchParams()
  const [email, setEmail] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email.length) {
      return;
    }
    await toast.promise(
      apiOur.addRefAddress({user: email, follower: email}).then(() => setEmail('')),
      {
        loading: 'Sending request...',
        success: <b>Thanks for your subscribe! ✅</b>,
        error: e => <b>{e.message}</b>,
      },
    )
  }

  return (
    <footer className="footer">
      <div className='footer-left'>
        <img src={logo} alt="logo" className="footer-logo" />
        <div className='footer-list'>
          Documents
          <ul>
            <li>
              <Link className="footer-left-link" to={`${routes.privacy}?${search.toString()}`}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="footer-left-link" to={`${routes.terms}?${search.toString()}`}>
                Terms & Conditions
              </Link>
            </li>
            {/*<li>*/}
            {/*  <a className="footer-left-link" href={hrefs.rpcEndpoints} target="_blank" rel="noreferrer noopener">*/}
            {/*    RPC Endpoints*/}
            {/*  </a>*/}
            {/*</li>*/}
            <li>
              <Link className="footer-left-link" to={`${routes.cookies}?${search.toString()}`}>
                Cookie Policy
              </Link>
            </li>
            {/*<li>*/}
            {/*  <Link className="footer-left-link" to={`${routes.trademark}?${search.toString()}`}>*/}
            {/*    Trademark*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*  <Link className="footer-left-link" to={`${routes.bugBountyTerms}?${search.toString()}`}>*/}
            {/*    Bug Bounty Terms*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*  <Link className="footer-left-link" to={`${routes.employReferralProgram}?${search.toString()}`}>*/}
            {/*    Employee Referral Program*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*  <Link className="footer-left-link" to={`${routes.promotion}?${search.toString()}`}>*/}
            {/*    Promotion and Marketing Services*/}
            {/*  </Link>*/}
            {/*</li>*/}
          </ul>
        </div>
        <div className='footer-list'>
          Email:
          <a className="footer-left-link" href='mailto:support@lounge.finance'>support@lounge.finance</a>
          Address:
          <address>70 City Road,Southbank Melbourne, VIC 3006
            Australia</address>
          <p className="footer-reserved">Copyright © 2024 Cryptomesh.io. All rights reserved</p>
        </div>
      </div>

      <div className='footer-right'>
        <p>
          Stay updated for the latest news, drops and programs.
        </p>
        <form onSubmit={onSubmit} className='news-home-input'>
          <Input variant='dark' onChange={value => setEmail(value)} value={email} placeholder='Email address'
                 type='email'/>
          <SimpleButton text='Subscribe' type='submit'/>
        </form>
        <Medias/>
      </div>
    </footer>
  )
}
