import React, { useEffect, useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Validation from '../../Common/Validation';
import { TextField } from '@mui/material';
import apiHelper from '../../Common/ApiHelper';
import { useNavigate } from 'react-router-dom';
import Path from '../../Common/Path';
import SendIcon from '@mui/icons-material/Send';
import Timer from '../../Component/Timer/Timer';
export default function LoginScreen({ Auth, setAuth }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show); // eslint-disable-next-line
  const [open, setOpen] = React.useState(true);
  const [LoginError, setLoginError] = useState([])
  const [token, settoken] = useState()
  const [mute, setmute] = useState(false)
  const [user, setuser] = useState({
    email: "",
    password: "",
    otp: ""
  })
  const [IsSubmited, setIsSubmited] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (Auth) {
      navigate(Path.dashBoard)
    }// eslint-disable-next-line
  }, [])

  const LoginHandler = async () => {
    try {
      setIsSubmited(true)
      const ValidationResult = Validation(user, "login")

      if (ValidationResult.length > 0) {
        setLoginError(ValidationResult)
        return
      }
      setmute(true)
      setTimeout(() => {
        setmute(false)
      }, 10000);
      const result = await apiHelper.AdminLogin(user)
      console.log(result)
      if (result) {
        const Token = result.data.user.token
        settoken(Token)
        
      }
    } catch (error) {
      setAuth(false)
      if (error.response && error.response.data) {
        if (error.response.status === 400 && error.response.data.message === "Validation Error") {
          setLoginError(error.response.data.ValidationResult)
          return
        }
      }
    }
  }

  const OtpVerify = async () => {
    try {
      setIsSubmited(true)

      const ValidationResult = Validation(user, "otpverify")

      if (ValidationResult.length > 0) {
        setLoginError(ValidationResult)
        return
      }
      const result = await apiHelper.OtpVerify(user)

      if (result) {
        localStorage.setItem("TOKEN", token)
        navigate(Path.dashBoard)
        setAuth(true)
      }


    } catch (error) {
      setAuth(false)
      if (error.response && error.response.data) {
        if (error.response.status === 400 && error.response.data.message === "Valiodation Error") {
          setLoginError(error.response.data.ValidationResult)
          return
        }
      }
    }
  }

  return (
    <div>
      <Dialog open={open}  >
        <DialogTitle>Login</DialogTitle>
        <DialogContent className='d-flex flex-column' >
          <FormControl sx={{ mt: 2, width: '40ch' }} variant="outlined" >
            <TextField
              id="outlined-adornment-password"
              type={"email"}
              label="Email"
              error={LoginError.some(x => x.key === "email")}
              helperText={LoginError.find(x => x.key === "email")?.message}
              onChange={(e) => {
                setuser({ ...user, email: e.target.value })
                if (IsSubmited) {
                  const ValidationResult = Validation({ ...user, email: e.target.value }, "login")
                  setLoginError(ValidationResult)
                }
              }}
            />
          </FormControl>
          <FormControl sx={{ mt: 2, width: '40ch' }} variant="outlined">
            <TextField
              error={LoginError.some(x => x.key === "password")}
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={LoginError.find(x => x.key === "password" ? true : false)?.message}
              onChange={(e) => {
                setuser({ ...user, password: e.target.value })
                if (IsSubmited) {
                  const ValidationResult = Validation({ ...user, password: e.target.value }, "login")
                  setLoginError(ValidationResult)
                }
              }}
              label="Password"
            />
          </FormControl>

          <FormControl sx={{ mt: 2, width: '25ch' }}>
            <TextField id="outlined-basic" label="OTP" variant="outlined"
              error={LoginError.some(x => x.key === "otp")}
              helperText={LoginError.find(x => x.key === "otp")?.message}
              onChange={(e) => {
                setuser({ ...user, otp: e.target.value })
                if (IsSubmited) {
                  const ValidationResult = Validation({ ...user, otp: e.target.value }, "otpverify")
                  setLoginError(ValidationResult)
                }
              }}
            />
            <Timer mute={mute} setmute={setmute}/>
            <Button onClick={LoginHandler} disabled={mute} variant="contained" sx={{ mt: 0.5, width: "10vw" }} endIcon={<SendIcon />}>
              Send
            </Button>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button >Cancel</Button>
          <Button onClick={OtpVerify}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>

  )
}
