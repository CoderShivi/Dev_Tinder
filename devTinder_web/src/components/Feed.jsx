import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./userCard";

const Feed =  () => {
  const feed = useSelector((store) => store.feed);
  console.log("Feed",feed);
  const dispatch=useDispatch()
  
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log("feed Result",res)
      dispatch(addFeed(res?.data?.data))
    } catch (err) {}
  };
  useEffect(()=>{
 getFeed()
},[])
return  (

    <div className="min-h-screen flex justify-center items-center">
      <UserCard    />
    </div>
  
)
};



export default Feed;
