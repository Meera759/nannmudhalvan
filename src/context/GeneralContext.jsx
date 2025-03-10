import axios from 'axios';
import React, { useEffect, useState } from 'react'


export const GeneralContext = React.createContext();

const GeneralContextProvider = ({children}) => {

    const [topNews, setTopNews] = useState([])

    const [businessNews, setBusinessNews] = useState([]);
    const [technologyNews, setTechnologyNews] = useState([]);
    const [politicsNews, setPoliticsNews] = useState([]);

    useEffect(() => { 
      const fetchAllNews = async () => {
        await fetchTopNews();
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 sec delay
        await fetchBusinessNews();
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 sec delay
        await fetchPoliticsNews();
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 sec delay
        await fetchTechnologyNews();
    };
    
    fetchAllNews();
      }, []);
    
      const fetchTopNews = async () => {
        try {
          const response = await axios.get("https://newsapi.org/v2/everything?q=popular&apiKey=37306aca596542f0a8402978de3d4224");
          console.log("Top News Response:", response.data); // Debugging
          setTopNews(response.data.articles);
        } catch (error) {
          console.error("Error fetching top news:",error);
        }
      }

      const fetchBusinessNews = async () => {
        try {
          const response = await axios.get("https://newsapi.org/v2/everything?q=business&apiKey=37306aca596542f0a8402978de3d4224");
          setBusinessNews(response.data.articles);
        } catch (error) {
          console.error(error);
        }
      }
      const fetchPoliticsNews = async () => {
        try {
          const response = await axios.get("https://newsapi.org/v2/everything?q=politics&apiKey=37306aca596542f0a8402978de3d4224");
          setPoliticsNews(response.data.articles);
        } catch (error) {
          console.error(error);
        }
      }
      const fetchTechnologyNews = async () => {
        try {
          const response = await axios.get("https://newsapi.org/v2/everything?q=technology&apiKey=37306aca596542f0a8402978de3d4224");
          setTechnologyNews(response.data.articles);
        } catch (error) {
          console.error(error);
        }
      }

    
  return (
    <GeneralContext.Provider value={{topNews, businessNews, technologyNews, politicsNews}} >{children}</GeneralContext.Provider>
  )
}

export default GeneralContextProvider