import React, { useEffect, useState } from "react"
import "./App.css"
import { Button } from "@/components/ui/button"
import supabase from "./supabase/supabase-client"
import supabaseStorage from "./supabase/supabase-data"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useDispatch } from "react-redux"
import { signIn, signOut } from "./store/authReducer"
import { BeatLoader, BounceLoader } from "react-spinners"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    supabase.getCurrentSession().then((data) => {
      if (data) {
        dispatch(signIn(data))
        console.log(data);

      } else {
        dispatch(signOut())
      }
    }).catch((error) => console.log(error.message)).finally(() => setLoading(false));


  }, [])
  return (
    < div className="min-h-screen flex flex-col justify-between">
      <Header />
      {loading ? (<h1 className="text-2xl mx-auto text-center">Please wait<BeatLoader color="white"/></h1>) : (<h1>Welcome</h1>)
      }
      <Footer />
    </div>
  )
}

export default App
