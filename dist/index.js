"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    const a = 4;
    if (a > 5) {
        res.send('> 5');
    }
    else {
        res.send('NOT > 5');
    }
});
app.get('/about', (req, res) => {
    res.send('About get');
});
app.post('/about', (req, res) => {
    res.send('About post');
});
app.listen(port, () => {
    console.log(`App start on port ${port}`);
});
