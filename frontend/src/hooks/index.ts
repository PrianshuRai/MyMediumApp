import axios from "axios";
import { useEffect, useState } from "react"
import { BACKENDURL } from "../config";

interface Blog {
	"content": string;
	"title": string;
	"id": string;
	"published": string;
	"author": {
		"name": string;
	}
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>();

    useEffect(() => {
        console.log(`token-->>${localStorage.getItem("token")}`);
        axios.get(`${BACKENDURL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            const data = response.data.blog;
            console.log(data);
            setBlogs(data);
            setLoading(false);
        }).catch(error => console.log(
            error
        ))
    }, [])
    return {
        loading,
        blogs
    }
}

export const useBlog = ({ id }: {id:string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        console.log(`token-->>${localStorage.getItem("token")}`);
        axios.get(`${BACKENDURL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            const data = response.data.blog;
            console.log(data);
            setBlog(data);
            setLoading(false);
        }).catch(error => console.log(
            error
        ))
    }, [])
    return {
        loading,
        blog
    }
}

interface dataObj {
    title: string;
    content: string;
}

export const usePublish = async ({data}: dataObj) => {
    const [loading, setLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState(false);

    const response = await axios.post(`${BACKENDURL}/api/v1/blog/create`, {
        title: data.title,
        content: data.content
    }, {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })

    if (response.status === 200) {
        setSaveStatus(response.data.id);
        setLoading(false);
    } else {
        alert("Error saving blog");
        setSaveStatus(response.data.id);
        setLoading(false);
    }

    return {
        loading,
        saveStatus
    };
}