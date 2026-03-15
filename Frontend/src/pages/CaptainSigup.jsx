import { useState } from 'react'
import { Link } from 'react-router-dom'
const CaptainSigup = () => {
        const [email,setEmail]=useState("")
    const [first,setFirst]=useState("")
    const [last,setLast]=useState("")
    const [password,setPassword]=useState("")
    const [captaindata,setCaptainData]=useState("")

    const submitHandler=(e)=>{
        e.preventDefault()
        setCaptainData({
            captainname:{
                firstName:first,
                lastName:last
            },
            password:password,
            email:email
        })
        console.log(Captaindata)
        setEmail('')
        setPassword('')
        setLast('')
        setFirst('')

    }
  return (
    <div className="p-7 flex h-screen justify-between flex-col">
      <div>
        <img
          className="w-18 h-17 mb-2"
          src="https://www.svgrepo.com/show/519937/uber-driver.svg"
          alt="Uber Logo"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-base font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 ">
            <input
              className="bg-[#eeeeee]  w-1/2 rounded px-4 py-2 border placeholder:text-sm "
              required
              type="text"
              placeholder="First Name"
              value={first}
              onChange={(e)=>{
                setFirst(e.target.value)
              }}
            />
            <input
              className="bg-[#eeeeee]  w-1/2 rounded px-4 py-2 border  placeholder:text-sm "
              required
              type="text"
              placeholder="Last Name"
              value={last}
              onChange={(e)=>{
                setLast(e.target.value)
              }}
            />
          </div>
          <h3 className="text-base font-medium mb-2">What's Your Email</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            required
            type="email"
            placeholder="email@example.com"
            value={email}
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
            required
            type="password"
            placeholder="Password"
            value={password}
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
          />
          <button className="bg-[#111] text-white front-medium mb-7 rounded px-4 py-2 border w-full text-lg ">
            Login
          </button>
        </form>
        <p className="text-center">
          Already Account?{" "}
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[8px] leading-tight">
          This site is protected by reCAPTCHA and the <span className="underline">Google Policy</span> and <span className="underline">Terms of Service apply</span>
        </p>
      </div>
    </div>
  )
}

export default CaptainSigup
