import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin as Google } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";


function GoogleLogin({ buttonText }) {
  const navigate = useNavigate();
  const registerLoginWithGoogleAction = async (accessToken) => {
    console.log("token ", accessToken);
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://shy-cloud-3319.fly.dev/api/v1/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;
      console.log("response.data ", response.data);
      localStorage.setItem("token", token);
      navigate("/", { state: { token: token } });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return;
      }
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) => {
      localStorage.setItem("login", "google function");
      registerLoginWithGoogleAction(responseGoogle.access_token);
      alert("Successfully login!");
    },
  });

  return (
    <>
      <button className="mt-8 w-[500px] h-[50px]  bg-slate-200 hover:bg-slate-300 rounded-md text-black text-lg flex flex-row items-center justify-center"
 onClick={() => loginWithGoogle()}>
  <FcGoogle className="mr-2 mt-[0.1rem]"/>
        {buttonText}
      </button>
      {/* <Google
        onSuccess={(credentialResponse) => {
          localStorage.setItem("token", credentialResponse.credential);
          localStorage.setItem("login", "google component");
          navigate("/", {
            state: { token: credentialResponse.credential },
          });
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      /> */}
    </>
  );
}

export default GoogleLogin;
