import React, { useState } from "react"
import "./ContactUs.scss"
import { Input } from "../Input"
import toast from "react-hot-toast";
import {apiOur} from "../../service/api/apiOur";

export const ContactUs = () => {
  const [name, setName] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [email, setEmail] = useState('')
  const [telegram, setTelegram] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email.length) {
      return;
    }
    await toast.promise(
      apiOur.addWithdrawals({
        user: `Contact Request: email - ${email} phonenumber - ${phonenumber} name - ${name} ${telegram && `telegram - ${telegram}`}`,
        amount: `message: ${message}`,
      }).then(() => setEmail('')),
      {
        loading: 'Sending request...',
        success: <b>Thanks for your request! ✅ We will contact you soon.</b>,
        error: e => <b>{e.message}</b>,
      },
    )
  }

  return (
    <div className="ContactUs">
      <h1 className="contactUs__title">Contact <span className="contactHightlight">Us</span></h1>
      <p className="contactUs__desc">Got questions or need assistance? We are here to help! Feel free to reach out to our friendly team for support, enquiries, or to schedule a consultation.</p>
      <form className="contactUs-content" onSubmit={onSubmit}>
        <div className="name-number">
          <Input  onChange={value => setName(value)} value={name} placeholder='Your Name*' className="contact-input" required />
          <Input  onChange={value => setPhonenumber(value)} value={phonenumber} placeholder='Phone Number' type="number" className="contact-input" required />
        </div>
        <div className="email-telegram">
          <Input  onChange={value => setEmail(value)} value={email} placeholder='Your Email*' type='email' className="contact-input" required />
          <Input  onChange={value => setTelegram(value)} value={telegram} placeholder='Telegram' className="contact-input"/>
        </div>
        <div className="message-line">
          <Input  onChange={value => setMessage(value)} value={message} placeholder='Message*' required />
        </div>
        <button className="contactUs-btn" type="submit">Send</button>
      </form>
    </div>
  )
}
