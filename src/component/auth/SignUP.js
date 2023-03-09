import React from "react";
import { useHistory } from "react-router-dom";
import "../assets/css/global.css"

function SignUP() {
  const history = useHistory();

  const submitData = (data) => {
    history.push("/#");
  };

  return (
    <div class="container_signup12">
      <div class="form_signup12">
        <div class="form-group12">
          <input type="text" placeholder="First Name" class="form-control" />
          <input type="text" placeholder="Last Name" class="form-control" />
        </div>
        <div class="form-wrapper12">
          <input type="text" placeholder="Organization Name" class="form-control" />
        </div>
        <div class="form-wrapper12">
          <input type="text" placeholder="Organization (Brand/Lab)" class="form-control" />
        </div>
        <div class="form-wrapper12">
          <input type="text" placeholder="Industry" class="form-control" />
        </div>
        <div class="form-wrapper12">
          <input type="text" placeholder="UserName" class="form-control" />
        </div>
        <div class="form-wrapper12">
          <input type="text" placeholder="Email" class="form-control" />
        </div>
        <div class="form-wrapper12">
          <input type="text" placeholder="Password" class="form-control" />
        </div>
        <button onClick={submitData} className="button">REGISTER NOW</button>
      </div>
      <div class="small">
        <img src={require(`../assets/icons/eikomp_logo.png`)} className="eikomp_logo_signup" width={230} height={130} alt="logo" />
      </div>
    </div>
  );
}

export default SignUP;
