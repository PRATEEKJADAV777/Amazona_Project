import { Cookies } from "react-cookie";

export default function GetIP() {
  const result = new Cookies()
  return result.cookies.IP
}

