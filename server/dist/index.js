"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv").config({ path: "/home/mohit/Desktop/codespace/Chat-Bot/server/.env" });
const client_1 = require("@prisma/client");
const ai_1 = require("./ai");
const Formatter_1 = require("./Formatter");
const hilight_1 = require("./hilight");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const prisma = new client_1.PrismaClient();
const randomWords = ["adventure", "harmony", "journey", "serenity", "freedom", "wisdom", "courage", "inspiration", "hope", "truth"];
const para = `A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs. This is because paragraphs show a reader where the subdivisions of an essay begin and end, and thus help the reader see the organization of the essay and grasp its main points.

Paragraphs can contain many different kinds of information. A paragraph could contain a series of brief examples or a single long illustration of a general point. It might describe a place, character, or process; narrate a series of events; compare or contrast two or more things; classify items into categories; or describe causes and effects. Regardless of the kind of information they contain, all paragraphs share certain characteristics. One of the most important of these is a topic sentence.
`;
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            res.status(400).send({ msg: "missing or invalid headers" });
        }
        else {
            let raw = yield (0, ai_1.generateContent)(prompt);
            let bold = (0, Formatter_1.Formatter)(raw, '**', 'b');
            let generate = (0, hilight_1.Highlight)(bold, "```", "code");
            res.status(200).send({ usr: prompt, Ai: generate });
        }
    }
    catch (err) {
        res.status(500).send({ msg: "something went wrong" });
    }
}));
app.post("/newchat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chats, chatid } = req.body;
        let head = chats[0].user;
        if (!chats) {
            res.status(400).send({ msg: "invalid or missing headers" });
        }
        else {
            if (!chatid) {
                let number = Math.floor(Math.random() * randomWords.length);
                let heading = (randomWords[number]);
                yield prisma.user.create({
                    data: {
                        Chats: chats,
                        Heading: head
                    }
                }).then((resp) => {
                    res.status(201).send({ msg: "data successfully saved" });
                }).catch((err) => {
                    res.status(400).send({ err: err });
                });
            }
            else {
                yield prisma.user.update({
                    where: { id: chatid },
                    data: { Chats: chats }
                }).then((resp) => {
                    res.status(201).send({ msg: "chat saved successfully" });
                }).catch((err) => {
                    res.status(400).send({ err: err });
                });
            }
        }
    }
    catch (err) {
        res.status(500).send({ msg: "something went wrong" });
    }
}));
app.post("/getchats", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        if (!id) {
            res.status(400).send({ msg: "invalid or missing headers" });
        }
        else {
            yield prisma.user.findUnique({
                where: {
                    id: id
                }
            }).then((resp) => {
                res.status(201).send(resp);
            }).catch((err) => {
                res.status(400).send({ err: err });
            });
        }
    }
    catch (err) {
        res.status(500).send({ msg: "something went wrong" });
    }
}));
app.get("/mychats", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        prisma.user.findMany({}).then((resp) => {
            res.status(200).send(resp);
        }).catch((err) => {
            res.status(400).send({ err: err });
        });
    }
    catch (err) {
        res.status(500).send({ msg: "something went wrong" });
    }
}));
app.post("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        prisma.user.delete({
            where: {
                id: id
            }
        }).then((resp) => {
            res.status(200).send(resp);
        }).catch((err) => {
            res.status(400).send({ err: err });
        });
    }
    catch (err) {
        res.status(500).send({ msg: "something went wrong" });
    }
}));
app.listen(4444, () => console.log("Running => http://localhost:4444"));
