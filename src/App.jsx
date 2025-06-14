import React, { useEffect, useState } from "react"
import "./App.css"
import { Button } from "@/components/ui/button"
import supabase from "./supabase/supabase-client"
import supabaseStorage from "./supabase/supabase-data"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useDispatch } from "react-redux"
import { signIn, signOut } from "./store/authReducer"
import { BeatLoader } from "react-spinners"
import { Input, Container, Login } from "./components/import.js"
import Signup from "./components/Signup.jsx"
import { Outlet } from "react-router-dom"
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    supabase.getCurrentSession().then((session) => {
      if (session) {
        dispatch(signIn({userData:session.user}))
        console.log(data);
      } else {
        dispatch(signOut())
      }
    }).catch((error) => console.log(error.message)).finally(() => setLoading(false));

    const { data: authListener } = supabase.supabaseClient.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event, session);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        dispatch(signIn({ userData: session?.user }));
      } else if (event === 'SIGNED_OUT') {
        dispatch(signOut());
      }
    });

    // Cleanup subscription
    return () => {
      authListener.subscription.unsubscribe();
    };

  }, [dispatch])
  return (
    < div className="min-h-screen flex flex-col justify-between items-center w-full bg-gradient-to-r from-stone-500 to-stone-700">
      <Header />
      {loading ? (<h1 className="text-white text-2xl mx-auto text-center">Please wait<BeatLoader color="white" /></h1>) :
        (

          <main>
            <Outlet />
          </main>
        )
      }
      <Footer />
    </div>
  )
}

export default App
