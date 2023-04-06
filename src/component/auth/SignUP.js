import React, { useState } from "react";
import { Col, Row } from "antd";
import { useHistory } from "react-router-dom";
import "../assets/css/global.css";

function SignUP() {
  const [first_name,set_first_name]=useState("")
  const [last_name,set_last_name]=useState("")
  const [organization_name,set_organization_name]=useState("")
  const [email,set_email]=useState("")
  const [mobile,set_mobile]=useState("")
  const [username,set_username]=useState("")
  const [password,set_password]=useState("")
  const [password2, set_password2] = useState("")
  const history = useHistory();
   
  async function submitData(){

    let item={username,password,password2,email,first_name,last_name,organization_name,mobile}

    console.warn(item)
      let result = await fetch("https://eikomp.pythonanywhere.com/register",{
      method:'POST',
      headers: {
        "Content-Type" : 'application/json',
        "Accept" : 'application/json'
      },
      body:JSON.stringify(item),
      });
      result = await result.json()
      console.warn("result", result)
      history.push('login')
      localStorage.setItem("user-info".JSON.stringify(result))
    }

  return (
    <div className="auth-box">
      <div className="signup">
        <div className="left-box">
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <label1>First Name</label1>
              <input
                type="text"
                placeholder=""
                name="first_name"
                value={first_name}
                onChange={(e)=>set_first_name(e.target.value)}
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <label1>Last Name</label1>
              <input
                type="text"
                placeholder=""
                name="last_name"
                value={last_name}
                onChange={(e)=>set_last_name(e.target.value)}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label1>Company Name</label1>
              <input
                type="text"
                placeholder=""
                name="organisation_name"
                value={organization_name}
                onChange={(e)=>set_organization_name(e.target.value)}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label1>Email ID</label1>
              <input
                type="email"
                placeholder=""
                name="email"
                value={email}
                onChange={(e)=>set_email(e.target.value)}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label1>Mobile Number</label1>
              <input
                type="tel"
                placeholder=""
                name="mobile"
                value={mobile}
                onChange={(e)=>set_mobile(e.target.value)}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label1>Username</label1>
              <input
                type="text"
                placeholder=""
                name="username"
                value={username}
                onChange={(e)=>set_username(e.target.value)}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label1>Password</label1>
              <input
                type="password"
                placeholder=""
                name="password"
                value={password}
                onChange={(e)=>set_password(e.target.value)}
                required
              />
            </Col>
            <Col xs={24} md={24}>
              <label1>Confirm Password</label1>
              <input
                type="password"
                placeholder=""
                name="password2"
                value={password2}
                onChange={(e)=>set_password2(e.target.value)}
                required
              />
            </Col>
          </Row>
          <button onClick={submitData} className="button">
            REGISTER NOW
          </button>
        </div>
        <div className="right-box">
          {/* <h2>ElKOMP</h2>
        <p className="p_signup">Efficient Compliances.</p> */}
          <img
            src={require(`../assets/icons/eikomp_logo.png`)}
            width={230}
            height={200}
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUP;

