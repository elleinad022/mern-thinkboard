import React from "react";
import Navbar from "../components/Navbar";
import RateLimitedUi from "../components/RateLimitedUi";
import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(true);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.post("https://localhost:5001/api/notes");
        console.log(res.data);
      } catch (error) {
        console.log("Error fetching notes");
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUi />}
    </div>
  );
};

export default HomePage;
