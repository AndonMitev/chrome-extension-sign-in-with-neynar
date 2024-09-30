import { useEffect, useState } from "react"

const CLIENT_ID = "CLIENT_ID"
const API_KEY = "API_KEY"
const REDIRECT_URI = chrome.identity.getRedirectURL()
console.log("REDIRECT_URI", REDIRECT_URI)

declare global {
  interface Window {
    onSignInSuccess: (userData: any) => void
  }
}

export default function NeynarSignIn() {
  const [authUrl, setAuthUrl] = useState("")

  // attach onSignInSuccess to window
  useEffect(() => {
    window.onSignInSuccess = (userData: any) => {
      console.log("User data:", userData)
    }
  }, [])

  // fetch authorization URL
  useEffect(() => {
    const fetchAuthorizationUrl = async () => {
      const url = `https://api.neynar.com/v2/farcaster/login/authorize?response_type=code&client_id=${CLIENT_ID}`
      const options = {
        method: "GET",
        headers: { accept: "application/json", api_key: API_KEY }
      }

      const response = await fetch(url, options)
      const data = await response.json()
      setAuthUrl(data.authorization_url)
    }

    fetchAuthorizationUrl()
  }, [])

  const initiateNeynarAuth = () => {
    chrome.identity.launchWebAuthFlow({
      url: authUrl,
      interactive: true
    })
  }

  return (
    <button
      onClick={initiateNeynarAuth}
      className="neynar_signin"
      data-client_id={CLIENT_ID}
      data-success-callback="onSignInSuccess">
      Sign in with Neynar
    </button>
  )
}
