"use client";

import { useRouter } from "next/navigation";

export default function Create(){
    const router = useRouter();
    return(
        <form onSubmit={(e)=>{
            e.preventDefault();
            const title = e.target.title.value;
            const body = e.target.body.value;
            const option = {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, body})
            }
            fetch(`http://localhost:9999/topics`, option)
                .then(res=>res.json())
                .then(result=>{
                    console.log(result);
                    const lastid = result.id;
                    router.refresh();
                    router.push(`/read/${lastid}`);
                })
        }}>
            <p>
                <input type="text" name="title" placeholder="title" />
            </p>
            <p>
                <textarea type="body" name="body" placeholder="title" ></textarea>
            </p>
            <p>
                <input type="submit" value="create" />
            </p>
        </form>
    )
}