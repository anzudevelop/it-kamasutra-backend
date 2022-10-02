"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const httpStatus = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
};
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
const db = {
    lists: [
        { id: 1, item: 'bread' },
        { id: 2, item: 'milk' },
        { id: 3, item: 'milkshake' },
        { id: 4, item: 'water' },
    ]
};
app.get('/list', (req, res) => {
    let foundLists = db.lists;
    if (req.query.item) {
        foundLists = foundLists.filter(i => i.item.indexOf(req.query.item) > -1);
    }
    res.json(foundLists);
});
app.get('/list/:id', (req, res) => {
    let foundItem = db.lists.find(i => i.id === +req.params.id);
    if (!foundItem) {
        res.sendStatus(httpStatus.NOT_FOUND);
        return;
    }
    res.json(foundItem);
});
app.post('/list', (req, res) => {
    if (!req.body.item) {
        res.sendStatus(httpStatus.BAD_REQUEST);
        return;
    }
    const newItem = {
        id: db.lists.length + 1,
        item: req.body.item,
    };
    db.lists.push(newItem);
    res.status(httpStatus.CREATED);
    res.json(newItem);
});
app.delete('/list/:id', (req, res) => {
    db.lists = db.lists.filter(i => i.id !== +req.params.id);
    res.sendStatus(httpStatus.NO_CONTENT);
});
app.put('/list/:id', (req, res) => {
    if (!req.body.item) {
        res.sendStatus(httpStatus.BAD_REQUEST);
        return;
    }
    let foundItem = db.lists.find(i => i.id === +req.params.id);
    if (!foundItem) {
        res.sendStatus(httpStatus.NOT_FOUND);
        return;
    }
    foundItem.item = req.body.item;
    res.status(httpStatus.NO_CONTENT);
    res.json(foundItem);
});
app.listen(port, () => {
    console.log(`App start on port ${port}`);
});
/*
fetch('http://localhost:3000/list', { method: 'GET'}).then(res => res.json()).then(json => console.log(json))
fetch('http://localhost:3000/list?item=milk', { method: 'GET'}).then(res => res.json()).then(json => console.log(json))
fetch('http://localhost:3000/list', { method: 'POST', body: JSON.stringify({item: 'tomato'}), headers: {'content-type': 'application/json'}}).then(res => res.json()).then(json => console.log(json))
fetch('http://localhost:3000/list/1', { method: 'DELETE'}).then(res => res.json()).then(json => console.log(json))
fetch('http://localhost:3000/list/1', { method: 'PUT', body: JSON.stringify({item: 'tomato'}), headers: {'content-type': 'application/json'}}).then(res => res.json()).then(json => console.log(json))
 */ 
