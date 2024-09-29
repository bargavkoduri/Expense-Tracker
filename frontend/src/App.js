import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import {useNavigate} from 'react-router-dom'

function App() {
  const { userId, isLoaded } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && userId) {
      navigate('/dashboard')
    }
  }, [isLoaded])

  return (
    <>

    </>
  );
}

export default App;
