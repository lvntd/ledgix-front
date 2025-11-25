import { GoogleOAuthProvider } from '@react-oauth/google'

type Props = { children: React.ReactNode }
const AuthLayout = ({ children }: Props) => {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || ''}
    >
      {children}
    </GoogleOAuthProvider>
  )
}

export default AuthLayout
