"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export const NoteCard = ({id, content}) => {
    const router = useRouter();
    const [newContent, setNewContent] = useState(content);
    const [editMode, setEditMode] = useState(false);

    async function handleUpdateNote(){
        const res = await fetch(`https://devscale-mockapi.fly.dev/api/collections/notes/records/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({content: newContent}),
        });
        const data = await res.json();
        // return data;
        console.log(data);
        setEditMode(false);
        router.refresh();

    }

    async function handleDeleteNote(){
        console.log(id);
        const res = await fetch(`https://devscale-mockapi.fly.dev/api/collections/notes/records/${id}`,{
            method: "DELETE",
        });
        router.refresh();
    }


    return (
        <div className='border-2 p-4 rounded-lg shadow my-4'>
            {editMode ? <input value={newContent || content} onChange={(e) => setNewContent(e.target.value)} /> : <div className='min-h-[120px]'>{content}</div> }

            <div className='flex gap-4'>
                {editMode ? <button onClick={handleUpdateNote}>Update</button> : <button onClick={() => setEditMode(true)}>Edit</button>}
                
                <button onClick={handleDeleteNote}>Delete</button>
            </div>
        </div>
    );
};