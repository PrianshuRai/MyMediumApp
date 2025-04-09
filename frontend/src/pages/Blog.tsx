import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";
export const Blog = () => {
    const params = useParams();

    return (<div className="">
        <Appbar/>
        <FullBlog id={params.id}/>
    </div>);
}