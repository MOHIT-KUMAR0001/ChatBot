import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
require("dotenv").config({ path: "/home/mohit/Desktop/codespace/Chat-Bot/server/.env" });
import { PrismaClient } from "@prisma/client";
import { generateContent } from "./ai";
import { Formatter } from "./Formatter"
import { Highlight } from "./hilight";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const prisma = new PrismaClient();
const randomWords = ["adventure", "harmony", "journey", "serenity", "freedom", "wisdom", "courage", "inspiration", "hope", "truth"];



const para = `A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs. This is because paragraphs show a reader where the subdivisions of an essay begin and end, and thus help the reader see the organization of the essay and grasp its main points.

Paragraphs can contain many different kinds of information. A paragraph could contain a series of brief examples or a single long illustration of a general point. It might describe a place, character, or process; narrate a series of events; compare or contrast two or more things; classify items into categories; or describe causes and effects. Regardless of the kind of information they contain, all paragraphs share certain characteristics. One of the most important of these is a topic sentence.
`

app.post("/", async (req: Request, res: Response) => {

    try {
        const { prompt } = req.body;

        if (!prompt) {
            res.status(400).send({ msg: "missing or invalid headers" });
        } else {
            let raw = await generateContent(prompt);
            let bold = Formatter(raw, '**', 'b');
            let generate = Highlight(bold, "```", "code");
            res.status(200).send({ usr: prompt, Ai: generate })
        }

    } catch (err: any) {
        res.status(500).send({ msg: "something went wrong" });
    }

});

app.post("/newchat", async (req: Request, res: Response) => {

    try {

        const { chats, chatid } = req.body;
        let head = chats[0].user;
        if (!chats) {
            res.status(400).send({ msg: "invalid or missing headers" });
        } else {

            if (!chatid) {
                let number: number = Math.floor(Math.random() * randomWords.length);
                let heading: string = (randomWords[number]);
                await prisma.user.create({
                    data: {
                        Chats: chats,
                        Heading: head
                    }
                }).then((resp: any) => {
                    res.status(201).send({ msg: "data successfully saved" });
                }).catch((err) => {
                    res.status(400).send({ err: err });
                });

            } else {

                await prisma.user.update({
                    where: { id: chatid },
                    data: { Chats: chats }
                }).then((resp) => {
                    res.status(201).send({ msg: "chat saved successfully" });
                }).catch((err) => {
                    res.status(400).send({ err: err });
                });

            }
        }

    } catch (err) {
        res.status(500).send({ msg: "something went wrong" });
    }
});


app.post("/getchats", async (req: Request, res: Response) => {

    try {

        const { id } = req.body;

        if (!id) {
            res.status(400).send({ msg: "invalid or missing headers" });
        } else {
            await prisma.user.findUnique({
                where: {
                    id: id
                }
            }).then((resp: any) => {
                res.status(201).send(resp);
            }).catch((err) => {
                res.status(400).send({ err: err });
            })
        }

    } catch (err) {
        res.status(500).send({ msg: "something went wrong" });
    }
});


app.get("/mychats", async (req: Request, res: Response) => {

    try {

        prisma.user.findMany({}).then((resp: any) => {
            res.status(200).send(resp);
        }).catch((err) => {
            res.status(400).send({ err: err });
        });

    } catch (err: any) {
        res.status(500).send({ msg: "something went wrong" });
    }

});


app.post("/delete", async (req: Request, res: Response) => {

    try {

        const { id } = req.body;

        prisma.user.delete({
            where: {
                id: id
            }
        }).then((resp: any) => {
            res.status(200).send(resp);
        }).catch((err) => {
            res.status(400).send({ err: err });
        });

    } catch (err: any) {
        res.status(500).send({ msg: "something went wrong" });
    }

});


app.listen(4444, () => console.log("Running => http://localhost:4444"));
