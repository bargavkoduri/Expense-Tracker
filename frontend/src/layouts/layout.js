import { Outlet, useNavigate } from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key')
}

export default function RootLayout() {
    const navigate = useNavigate()

    return (
        <ClerkProvider
            routerPush={(to) => navigate(to)}
            routerReplace={(to) => navigate(to, { replace: true })}
            publishableKey={PUBLISHABLE_KEY}
        >
            <header className="flex items-center justify-between bg-gray-100 p-4">
                <div>
                    <h1 className='font-bold text-xl'>MoneyMap</h1>
                </div>
                <div className='px-5 flex items-center'>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <button onClick={() => {
                            navigate('/sign-in')
                        }}
                            className='rounded px-3 py-2 bg-gray-400'
                        >
                            Sign In
                        </button>
                    </SignedOut>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </ClerkProvider>
    )
}