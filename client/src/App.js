import {React, useEffect, useState, useContext} from 'react'
import {Routes, Route} from 'react-router-dom'
import { AppContext } from './Context'
import axios from "axios"
import Header1 from "./components/Header1"
import Header2 from "./components/Header2"
import Stars from './landing_pages/Stars'
import Translate from './landing_pages/Translate'
import Expressions from './landing_pages/Expressions'
import Words from './landing_pages/Words'
import Login from './landing_pages/Login'

function App() {

  const {translationObject, setTranslationObject, sourceLang, targetLang, user, setUser, setIsLogged} = useContext(AppContext)
  const sourceText = translationObject[sourceLang]
  const [showListModal, setShowListModal] = useState()
  const [catSelected, setCatSelected] = useState(false)
  const [wordState, setWordState] = useState()
  const [loading, setLoading] = useState(false);

  // const translateText = async () => {
  //   const url = "https://the-french-things.onrender.com:8000/exp/translate"
  //   const data = {sourceText, sourceLang, targetLang, url}
  //   const response = await axios.get(`/translate`, {params : data})
  //   setLoading(false);
  //   setTranslationObject({...translationObject, [targetLang]: response.data})
  // }

  //  const translateText = async () => {
  //   const data = {sourceText, sourceLang, targetLang}
  //   const response = await axios.get('/translate', {params : data})
  //   setLoading(false);
  //   setTranslationObject({...translationObject, [targetLang]: response.data})
  // }

  function translateText(){() => {fetch("https://libretranslate.com/translate", {
    method: "POST",
    body: JSON.stringify({
      q: `${sourceText}`,
      source: `${sourceLang}`,
      target: `${targetLang}`,
      format: "text",
      api_key: ""
    }),
    headers: { "Content-Type": "application/json" }
  }).then((r) => r.json()).then((response) => {setLoading(false);
      setTranslationObject({...translationObject, [targetLang]: response.translatedText})})}}


  useEffect(() =>{
    fetch("/api/me")
    .then((r) =>{
      if(r.ok)
      {r.json().then((r) => {setUser(r); setIsLogged(true)})}
      else
      {console.log("/api/me says", r)}})
  }, [])

  useEffect(() =>{
    if(user){
      setIsLogged(true)}
      else{setIsLogged(false)}
  },[user])


  return (
    <>
        <Header1/>
        <Header2 setCatSelected={setCatSelected} />
        <Routes>
          <Route path="/" element={<Translate loading={loading} setLoading={setLoading} translateText={translateText}/>}/>
          <Route path="/expressions" element={<Expressions showListModal={showListModal} setShowListModal={setShowListModal} />}/>
          <Route path="/words" element={<Words wordState={wordState} setWordState={setWordState} showListModal={showListModal} setShowListModal={setShowListModal} />}/>
          <Route path="/stars" element={<Stars wordState={wordState} setWordState={setWordState} catSelected={catSelected} setCatSelected={setCatSelected} showListModal={showListModal} setShowListModal={setShowListModal} />}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
    </> 
  )
}

export default App
