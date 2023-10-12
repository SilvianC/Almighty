  import React,{useState} from "react";
  import styled from "styled-components";
  import { useNavigate } from "react-router-dom";
import { login } from "../../api/member";
  

  const LoginPage = () => {
    const requestLogin = () =>{
      login(inputs,
        ({data}) =>{
          
        },
        (error) =>{
          console.log(error)
        })
    }
    const navigate = useNavigate();
    const [inputs,setinputs] = useState({
      id:"",
      password:"",
    });
    const gotoSignUpForm = () =>{
      navigate("/signup");
    }
    const {id,password} = inputs;

    const onChange = (e) => {
      const value = e.target.value
      const id = e.target.id

      setinputs({
          ...inputs,
          [id] : value
      })
    }
    return (
        <div>
          <div>
            <input type="text" id="id" value={id} placeholder="아이디"  maxlength="20" autocapitalize="off" onChange={onChange}/>
            </div>
            <div>
            <input type="password" id="password" value={password} placeholder="비밀번호"  maxlength="20" autocapitalize="off" onChange={onChange}/>
            </div>
            <div id="login_keep_wrap">
              <div class="keep_check">
                  <input type="checkbox" id="keep" name="nvlong" class="input_keep" value="off"/>
                  <label for="keep" class="keep_text">로그인 상태 유지</label>
              </div>
              <div class="ip_check">
                  <a href="/login/ext/help_ip3.html" target="_blank" id="ipguide" title="IP보안"><span class="ip_text">IP보안</span></a>
                  <span class="switch">
                      <input type="checkbox" id="switch" class="switch_checkbox" value="off"/>
                      <label for="switch" class="switch_btn">
                          <span class="blind" id="switch_blind">on</span>
                      </label>
                  </span>
              </div>
              <div>
                <button type="submit" onClick={requestLogin}>로그인</button>
                <button type="button" onClick={gotoSignUpForm}>회원 가입</button>
              </div>
          </div>
        </div>
      
    );
  };

  const S = {
    Wrap: styled.div`
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 100vh;
      background: linear-gradient(
        ${({ theme }) => theme.color.background2} 28%,
        ${({ theme }) => theme.color.background} 28%
      );

      text-align: center;
      padding-top: 100px;
      align-items: center;
    `,
    Logo: styled.div`
      height: 160px;
      margin: 30px auto;
    `,
    ThinkerImage: styled.div`
      align-self: center;
      width: 260px;
      margin: 12em auto;
      img {
        width: 100%;
        height: auto;
      }
    `,
  };

  export default LoginPage;
