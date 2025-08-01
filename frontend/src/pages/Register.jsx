import { useEffect, useState } from "react";
import login1 from "../assets/images/loginpage/login2.jpg";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { MenuItem, Select, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  checkEmailNumber,
  registerGoogleUser,
  registerUser,
  sendOTPtoMail,
  sendOTPtoNumber,
  verifyOTP,
} from "../apis/auth";
import { useAlert } from "../contexts/AlertContext";
import { useLoader } from "../contexts/LoaderContext";

function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const [input, setInput] = useState({
    name: { data: "", error: false, errorMessage: "" },
    mobile: { data: "", error: false, errorMessage: "" },
    email: { data: "", error: false, errorMessage: "" },
    password: { data: "", error: false, errorMessage: "" },
    gstin: { data: "", error: false, errorMessage: "" },
  });

  const [sendOTP, setsendOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [disableOTP, setDisableOTP] = useState(false);
  const [businessOption, setBusinessOption] = useState("other");
  const [token, setToken] = useState(null);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const [googleUserData, setGoogleUserData] = useState({
    pfp: "",
    googleId: "",
  });
  const navigate = useNavigate();
  const { setShowSnackBar, setMessage } = useAlert();
  const { setLoading } = useLoader();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token"));
  });

  useEffect(() => {
    if (token) {
      const userInfo = jwtDecode(token);
      console.log("Decoded User Info:", userInfo);
      setInput((prev) => ({
        ...prev,
        name: { data: userInfo.name, error: false, errorMessage: "" },
        email: { data: userInfo.email, error: false, errorMessage: "" },
      }));
      setGoogleUserData({ pfp: userInfo.picture, googleId: userInfo.googleId });
      setIsGoogleLogin(true);
    }
  }, [token]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setInput({
      name: { data: "", error: false, errorMessage: "" },
      mobile: { data: "", error: false, errorMessage: "" },
      email: { data: "", error: false, errorMessage: "" },
      password: { data: "", error: false, errorMessage: "" },
      gstin: { data: "", error: false, errorMessage: "" },
    });
    setsendOTP(false);
    setIsGoogleLogin(false);
    setOtp("");
  };

  const handleChange = (field, value) => {
    setInput((prev) => ({
      ...prev,
      [field]: { data: value, error: false },
    }));
  };

  const handleSubmit = async () => {
    // console.log("btn clicked");
    let hasErrors = false;
    const updatedInput = { ...input };

    for (const key in updatedInput) {
      const value = updatedInput[key].data.trim();

      updatedInput[key].error = false;
      updatedInput[key].errorMessage = "";

      if (key == "password" && isGoogleLogin) {
        continue;
      }

      if (value === "" && key !== "gstin") {
        updatedInput[key].error = true;
        updatedInput[key].errorMessage = `${
          key[0].toUpperCase() + key.slice(1)
        } is required.`;
        hasErrors = true;
      } else {
        if (key === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            updatedInput[key].error = true;
            updatedInput[key].errorMessage = "Enter a valid email address.";
            hasErrors = true;
          }
        }

        if (key === "mobile") {
          const mobileRegex = /^[0-9]{10}$/;
          if (!mobileRegex.test(value)) {
            updatedInput[key].error = true;
            updatedInput[key].errorMessage = "Enter a 10-digit mobile number.";
            hasErrors = true;
          }
        }

        if (key === "password") {
          if (value.length < 6) {
            updatedInput[key].error = true;
            updatedInput[key].errorMessage =
              "Password must be at least 6 characters.";
            hasErrors = true;
          }
        }
      }
    }

    setInput(updatedInput);
    // console.log(updatedInput);

    if (!hasErrors) {
      console.log("Form submitted:", {
        name: input.name.data,
        email: input.email.data,
        mobile: input.mobile.data,
        password: input.password.data,
      });

      //Check number and email
      setLoading(true);
      const response = await checkEmailNumber(
        input.email.data,
        input.mobile.data
      );
      setLoading(false);
      if (response.success) {
        // console.log("Number Unique");
        setLoading(true);
        // const sendOTPResponse = await sendOTPtoNumber(input.mobile.data);
        const sendOTPResponse = await sendOTPtoMail(input.email.data);
        setLoading(false);
        if (sendOTPResponse.success) {
          console.log("OTP Sent to ", input.email.data);
          setMessage("OTP Sent to " + input.email.data);
          setShowSnackBar(true);
          setsendOTP(true);
          setDisableOTP(true);
          setTimeout(() => {
            setDisableOTP(false);
          },30000)
        } else {
          console.log(sendOTPResponse.message);
          setMessage(sendOTPResponse.message);
          setShowSnackBar(true);
        }
      } else {
        console.log(response.message);
        setsendOTP(false);
        setMessage("Email already registered.");
        setShowSnackBar(true);
      }

      // Clear form if needed
      // setInput({ name: { ... }, ... }) — reset data fields
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    const response = await verifyOTP(input.email.data, otp);
    setLoading(false);
    if (response.success) {
      setMessage("OTP Verified");
      setShowSnackBar(true);
      handleNext();
    } else {
      setMessage(response.message);
      setShowSnackBar(true);
    }
  };

  const handleFinalSumbit = async () => {
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    
    if (businessOption == "gstin") {
      let gstin = input.gstin.data;
      gstin = gstin.toUpperCase();
    
    if (!gstinRegex.test(gstin) || gstin==null || gstin=="") {
      setMessage("Invalid GSTIN! Enter a valid GSTIN.");
      setShowSnackBar(true);
      return;
    }
  }
    

    console.log({
      name: input.name.data,
      email: input.email.data,
      phone: input.mobile.data,
      pfp: googleUserData.pfp,
      googleId: googleUserData.googleId,
      gstin: input.gstin.data,
    });
    setLoading(true);
    const response = await (isGoogleLogin
      ? registerGoogleUser({
          name: input.name.data,
          email: input.email.data,
          phone: input.mobile.data,
          pfp: googleUserData.pfp,
          googleId: googleUserData.googleId,
          gstin: input.gstin.data,
        })
      : registerUser({
          name: input.name.data,
          email: input.email.data,
          password: input.password.data,
          phone: input.mobile.data,
          gstin: input.gstin.data,
        }));
    setLoading(false);

    if (response.success) {
      setMessage(response.message);
      setShowSnackBar(true);
      navigate("/user/login");
    } else {
      setMessage(response.message);
      setShowSnackBar(true);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col md:flex-row w-9/10 h-8/10 py-6 md:p-0 md:w-3/5 md:h-3/4 rounded-2xl shadow-xl bg-white">
        {/* Left Div */}
        <div className="md:w-3/5 h-full p-4 flex flex-col gap-2">
          <p className="!text-lg text-center font-semibold">
            Complete your profile for business account
          </p>

          <div className="flex-1 p-4 overflow-y-auto">
            <Stepper activeStep={activeStep} orientation="vertical">
              {/*  First Step*/}
              <Step>
                <StepLabel>User Details</StepLabel>
                <StepContent>
                  <div className="flex flex-col md:flex-row gap-2">
                    <TextField
                      id="outlined-name"
                      label="Full Name"
                      variant="outlined"
                      disabled={isGoogleLogin}
                      size="small"
                      sx={{ m: "8px" }}
                      required
                      value={input.name.data}
                      onChange={(e) => handleChange("name", e.target.value)}
                      error={input.name.error}
                      helperText={input.name.errorMessage}
                    />

                    <TextField
                      id="outlined-email"
                      label="Email Address"
                      type="email"
                      variant="outlined"
                      size="small"
                      disabled={isGoogleLogin}
                      sx={{ m: "8px" }}
                      required
                      value={input.email.data}
                      onChange={(e) => handleChange("email", e.target.value)}
                      error={input.email.error}
                      helperText={input.email.errorMessage}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-2">
                    <TextField
                      id="outlined-mobile"
                      label="Mobile No"
                      type="tel"
                      variant="outlined"
                      size="small"
                      sx={{ m: "8px" }}
                      required
                      value={input.mobile.data}
                      onChange={(e) => handleChange("mobile", e.target.value)}
                      error={input.mobile.error}
                      helperText={input.mobile.errorMessage}
                    />

                    <TextField
                      id="outlined-password"
                      label="Password"
                      variant="outlined"
                      size="small"
                      sx={{ m: "8px" }}
                      disabled={isGoogleLogin}
                      type="password"
                      value={input.password.data}
                      onChange={(e) => handleChange("password", e.target.value)}
                      error={input.password.error}
                      helperText={input.password.errorMessage}
                    />
                  </div>

                  {/* <button
                    className="bg-blue-600 text-white text-sm px-8 py-2 mt-4 ml-2 rounded hover:bg-blue-700 "
                    // disabled={!(input.mobile.data.length>0 && !input.mobile.error)}
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Send OTP
                  </button> */}
                  {disableOTP ?<button
                    className="bg-neutral-400 text-white text-sm px-8 py-2 mt-4 ml-2 rounded "
                    // disabled={!(input.mobile.data.length>0 && !input.mobile.error)}
                  >
                    Try Again after 1 min
                  </button>:<button
                    className="bg-blue-600 text-white text-sm px-8 py-2 mt-4 ml-2 rounded hover:bg-blue-700 "
                    // disabled={!(input.mobile.data.length>0 && !input.mobile.error)}
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Send OTP
                  </button>}

                  {sendOTP && (
                    <div className="flex flex-row items-center gap-4 mt-8">
                      <TextField
                        id="outlined-otp"
                        label="OTP"
                        variant="outlined"
                        size="small"
                        sx={{ m: "8px" }}
                        // required
                        type="password"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        // error={input.password.error}
                        // helperText={input.password.errorMessage}
                      />

                      <button
                        className="bg-blue-600 text-white text-sm px-8 py-2 rounded hover:bg-blue-700 w-fit"
                        onClick={() => {
                          handleVerifyOTP();
                        }}
                      >
                        Validate
                      </button>
                    </div>
                  )}
                </StepContent>
              </Step>
              <Step>
                {/* Second Step */}
                <StepLabel>Business Information</StepLabel>
                <StepContent>
                  <p className="!text-sm !font-semibold">
                    Business Identification
                  </p>
                  <div className="flex flex-col mt-1 mb-8">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={businessOption}
                      label="business"
                      size="small"
                      sx={{ width: "50%" }}
                    >
                      <MenuItem value={"business"} disabled>
                        Business Name
                      </MenuItem>
                      <MenuItem
                        value={"gstin"}
                        onClick={() => setBusinessOption("gstin")}
                      >
                        GSTIN
                      </MenuItem>
                      <MenuItem
                        value={"other"}
                        selected
                        onClick={() => setBusinessOption("other")}
                      >
                        Other
                      </MenuItem>
                    </Select>

                    {businessOption === "gstin" && (
                      <TextField
                        id="outlined-gstin"
                        label="GSTIN"
                        variant="outlined"
                        size="small"
                        sx={{ m: "8px" }}
                        value={input.gstin.data}
                        onChange={(e) => handleChange("gstin", e.target.value)}
                        error={input.gstin.error}
                        helperText={input.gstin.errorMessage}
                      />
                    )}
                  </div>

                  <div className="flex flex-row gap-12">
                    <button
                      className="bg-orange-600 !text-sm text-white w-1/2 p-2 rounded-sm shadow-md"
                      onClick={() => {
                        handleReset();
                      }}
                    >
                      CANCEL
                    </button>

                    <button
                      className="bg-blue-900 !text-sm text-white w-1/2 p-2 rounded-sm shadow-md"
                      onClick={() => handleFinalSumbit()}
                    >
                      SUBMIT
                    </button>
                  </div>
                </StepContent>
              </Step>
            </Stepper>
            {/* {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>All steps completed - you&apos;re finished</Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Reset
                </Button>
                </Paper>
            )} */}
          </div>
          <p className="!text-xs text-center p-4">
            By clicking on Submit button you agree to industrybuying.com's{" "}
            <span
              className="!text-xs !text-blue-500 cursor-pointer "
              onClick={() => {
                navigate("/user/register");
              }}
            >
              Terms & Conditions
            </span>{" "}
            and{" "}
            <span
              className="!text-xs !text-blue-500 cursor-pointer "
              onClick={() => {
                navigate("/user/register");
              }}
            >
              Privacy Policy.
            </span>
          </p>
        </div>
        {/* Left Div end*/}

        {/* Right Div  */}
        <div className="hidden md:block w-2/5 h-full py-10 px-8 flex flex-col transition-transform duration-200 ">
          <img
            src={login1}
            alt="loginPage"
            className="h-full w-full rounded-2xl p-1 object-cover"
          ></img>
        </div>
        {/* Right Div end */}
      </div>
    </div>
  );
}

export default Register;
