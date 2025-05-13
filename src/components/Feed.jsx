import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {

    const getFeedData = useSelector((store) => store.feed);
    const dispatch = useDispatch();
    console.log("before -------"+ getFeedData);
    
    
    const fetchFeed = async () => {
        // if(getFeedData) return;

        try{
            const res = await axios.get(
                BASE_URL + "/feed",
                {
                    withCredentials : true
                }
            );

            console.log(res.data);

            dispatch(addFeed(res.data));

            console.log("after -------"+getFeedData);
        }
        catch(error)
        {
            console.log(error);
            
        }
    };
    
    useEffect(() => {
        fetchFeed();
    }, []);
    
    return (
        <div className="flex justify-center my-30 mt-10">
            <UserCard />
        </div>
    );
};

export default Feed;