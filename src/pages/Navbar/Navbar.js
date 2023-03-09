import React , {useEffect} from 'react'
import './Navbar.css';
import { NavLink, BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import $ from 'jquery';
import ClientDashboard from '../client-dashbord/Clientdashboard';

const Navbar = () => {
  const history = useHistory(); // initialize useHistory hook

  function animation(){
    var tabsNewAnim = $('#navbarSupportedContent');
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      "top":itemPosNewAnimTop.top + "px", 
      "left":itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click","li",function(e){
      $('#navbarSupportedContent ul li').removeClass("active");
      $(this).addClass('active');
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $(".hori-selector").css({
        "top":itemPosNewAnimTop.top + "px", 
        "left":itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
      });
    });
  }

  useEffect(() => {
    
    animation();
    $(window).on('resize', function(){
      setTimeout(function(){ animation(); }, 500);
    });
    
  }, []);

  function handleLogout() {
    // perform any necessary actions for logging out the user
    
    history.push("/#"); // redirect to login page after logout
  }


  return (
  <nav className="navbar navbar-expand-lg navbar-mainbg">

    <div 
        className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
            
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>
            
            <li className="nav-item active">
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/navbar/firstpage" exact>
                <i 
                className="far fa-address-book">
                </i>Start New Application
              </NavLink> 
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/navbar/review" exact>
                <i 
                className="far fa-clone">
                </i>Review Application
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/navbar/myaccount" exact>
                <i 
                className="far fa-clone">
                </i>My Account
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/navbar/check" exact>
                <i 
                className="far fa-clone">
                </i>Check List Of GST
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/navbar/add" exact>
                <i 
                className="far fa-clone">
                </i>Add Users
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/navbar/download" exact>
                <i 
                className="far fa-clone">
                </i>Download Form
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/navbar/view" exact>
                <i 
                className="far fa-clone">
                </i>View Reports
              </NavLink>
            </li>
        </ul>
      </div>
      <Router>
        <Switch>
          <Route exact path= "/navbar" component={ClientDashboard} />
        </Switch>
      </Router>
      <button99 onClick={handleLogout}><span99>Logout</span99></button99>
  </nav>
  
  )
}

export default Navbar;