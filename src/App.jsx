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
    < div className="min-h-screen flex flex-col justify-between items-center w-full">
      <Header />
      {loading ? (<h1 className="text-2xl mx-auto text-center">Please wait<BeatLoader color="white" /></h1>) :
        (

          <main>
            <Container>
              {/* <Login/> */}
              <Signup/>
            </Container>
          </main>
        )
      }
      <Footer />
    </div>
  )
}

export default App
