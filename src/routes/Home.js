import React, { useState,useEffect } from "react";
import { dbService } from "fbase";
import { addDoc, collection, onSnapshot, query, orderBy } from "firebase/firestore";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    
   
      useEffect(() => {
        const q = query(
        collection(dbService, "nweets"),
        orderBy("createdAt", "desc")
    
        );
        onSnapshot(q, (snapshot) => {
          const nweetArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          }));
          setNweets(nweetArr);
          });
          }, []);

    const onSubmit = async(e) => {
      e.preventDefault();
      try {
        const docRef = await addDoc(collection(dbService, "nweets"), {
        nweet,
        createdAt: Date.now(),
        });
        console.log("Document written with ID: ", docRef.id);
        } catch (error) {
        console.error("Error adding document: ", error);
        }
        
        setNweet("");
      };
    const onChange = (event) => {
      const {
        target: { value },
      } = event;
      setNweet(value);
    };
    console.log(nweets);
    return (
      <div>
        <form onSubmit={onSubmit}>
          <input
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
          />
          <input type="submit" value="Nweet" />
        </form>
        <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
      </div>
    );
  };
  export default Home;