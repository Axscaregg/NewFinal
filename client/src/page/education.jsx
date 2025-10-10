import react,{useState,useEffect} from "react";
import {useParams} from "react-router-dom";

function education() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
        useEffect(()=>{
            try {
                setLoading(true)
                setError("")
               
            }catch (e){

            }
        })
    return(
        <div>

        </div>
    )
}