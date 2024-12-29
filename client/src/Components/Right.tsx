import load from "../assets/load.svg";
import axios from "axios";

interface Props {
    prompt: string;
    setPrompt: React.Dispatch<React.SetStateAction<string>>;
    myres: { user: string; Ai: string }[];
    setMyres: React.Dispatch<React.SetStateAction<{ user: string; Ai: string }[]>>;
}

const Right: React.FC<Props> = ({ prompt, setPrompt, setMyres, myres }) => {

    interface mytype {
        user: string,
        Ai: string,
    }

    const Submit = async () => {

        let temp: mytype = {
            user: prompt,
            Ai: "",
        }

        setMyres([...myres, temp]);
        setPrompt("");

        if (prompt) {
            const response = await axios.post("http://localhost:4444", {
                prompt
            });

            if (response) {
                const myresp: mytype = {
                    user: response.data.usr,
                    Ai: response.data.Ai
                }
                setMyres([...myres, myresp]);
            }
        }

    }

    return (
        <>
            <div className="rightbar h-full flex-1 flex items-center flex-col w-full">
                <div className="top h-[90%] w-full p-10 flex flex-col gap-10 overflow-y-auto">

                    {

                        myres.map((res, id) => (


                            <>

                                {
                                    res.user ? (

                                        <>
                                            <div className="user lg:px-8 flex gap-5 flex-col lg:flex-row mt-10" key={id}>
                                                <div className="bot-image ">
                                                    <i className="ri-speak-ai-fill text-2xl bg-white rounded-md p-2"></i>
                                                </div>
                                                <div className="content">
                                                    <pre className="text-white text-xl font-uniq tracking-wide whitespace-pre-wrap">{res.user}</pre>
                                                </div>
                                            </div>


                                            {
                                                res.Ai ? (

                                                    <div className="bot bg-sea p-5 lg:p-8 flex gap-5 flex-col lg:flex-row lg:rounded-tr-3xl lg:rounded-bl-3xl" key={id}>
                                                        <div className="bot-image ">
                                                            <i className="ri-chat-ai-fill text-2xl text-white bg-primary rounded-md p-2 "></i>
                                                        </div>
                                                        <div className="content">
                                                            <pre className="text-white text-xl font-uniq tracking-wide whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: res.Ai }} />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <img src={load} alt="img" className="h-[50px] w-[50px]" />
                                                )
                                            }


                                        </>

                                    ) : null
                                }

                            </>

                        ))

                    }

                </div>

                <div className="bottom w-full h-[10%] p-5 ">
                    <div className="inp-container relative w-full h-[60px] flex items-center">
                        <input name="text" id="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full h-full bg-trans rounded-md focus:outline-none py-3 px-5 text-white text-xl" placeholder="Enter a Message..."></input>
                        <i className="ri-send-plane-fill absolute text-3xl text-white right-5" onClick={Submit}></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Right;

