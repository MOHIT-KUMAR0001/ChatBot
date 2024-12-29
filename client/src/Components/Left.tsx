import axios from "axios";
import React, { useEffect } from "react";

interface mytype {
    user: string,
    Ai: string,
}

interface mytitle {
    id: string,
    Chats: mytype
    Heading: string
}

interface Props {
    prompt: string;
    setPrompt: React.Dispatch<React.SetStateAction<string>>;
    myres: { user: string; Ai: string }[];
    setMyres: React.Dispatch<React.SetStateAction<{ user: string; Ai: string }[]>>;
    title: mytitle[];
    setTitle: React.Dispatch<React.SetStateAction<mytitle[]>>;
    chatid: string;
    setChatid: React.Dispatch<React.SetStateAction<string>>;
}


const Left: React.FC<Props> = ({ myres, setMyres, title, setTitle, chatid, setChatid }) => {

    const Toggle = () => {

        let elem = document.getElementById("nav");
        if (elem) {
            elem.classList.toggle("hidden");
        }
    }

    const Toggle2 = () => {
        let elem = document.getElementById("nav");
        let menu = document.getElementById("menu")

        if (elem && menu) {
            elem.classList.toggle("hidden");
            menu.classList.toggle("lg:nne");
        }
    }


    const newChat = async () => {

        if (myres.length > 0) {
            const response = await axios.post("http://localhost:4444/newchat", {
                chats: myres,
                chatid
            });

            if (response) {
                setMyres([]);
                setChatid('');
            }
        }
    }

    const Fetch = async (chat_id: string) => {
        setChatid(chat_id)
        const response = await axios.post("http://localhost:4444/getchats", {
            id: chat_id
        });

        if (response) {
            setMyres(response.data.Chats);
        }
    }

    const Chats = async () => {

        const response = await axios.get("http://localhost:4444/mychats");
        if (response) {
            setTitle(response.data)
        }
    }

    useEffect(() => {
        Chats();
    }, []);

    useEffect(() => {
        Chats();
    }, [myres]);

    const Delete = async (id: string) => {

        await axios.post("http://localhost:4444/delete", {
            id
        }).then(() => {
            Chats();
            setMyres([]);
            setChatid('');
        });
    }

    return (
        <>

            <div className="bar w-full bg-secondary flex justify-between h-10 items-center fixed z-20 lg:hidden">
                <div className="menu text-white px-5">
                    <i className="ri-menu-2-fill text-xl" onClick={Toggle}></i>
                </div>

                <div className="brand text-white px-5">
                    <i className="ri-vip-crown-fill text-xl"></i>
                </div>
            </div>

            <div className="bar-overlay bg-secondary h-full w-eg flex-col items-center py-[15%] absolute gap-5 lg:static  xl:w-bar lg:py-10 flex z-10 lg:w-lrg md:w-med" id="nav">

                <div className="menu text-white w-eg hidden lg:flex justify-end">
                    <i className='bx bx-x text-4xl' onClick={Toggle2}></i>
                </div>

                <button className="p-3 bg-sea w-eg rounded-md text-xl text-white" onClick={newChat}>New Chat</button>
                <div className="mychats w-eg flex-col gap-3 flex over">
                    {
                        title.map((res, id) => (
                            <>
                                <div className="box border-2 border-white rounded-md flex justify-between items-center text-white list-none p-2 text-xl" onClick={() => Fetch(res.id)} key={id}>
                                    <li className="whitespace-nowrap text-ellipsis overflow-hidden">{res.Heading}</li>
                                    <i className="ri-delete-bin-2-fill text-sea" onClick={(e) => { e.stopPropagation(); Delete(res.id) }}></i>
                                </div>
                            </>
                        ))
                    }
                </div>
            </div>


            <div className="menu text-white p-5 hidden" id="menu">
                <button className="p-2 bg-sea rounded-md">
                    <i className="ri-menu-2-fill text-4xl" onClick={Toggle2}></i>
                </button>
            </div>

        </>


    )
}

export default Left;


