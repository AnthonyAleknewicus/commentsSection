const express = require('express');
const methodOverride = require('method-override');
const app = express();
const path = require('path');


const { v4: uuid } = require('uuid');

// this line parses form-encoded info from request body
// app.use is a way of running some code or function on every single request, regardles of GET, POST, PUT, etc
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

let comments = [
    {
        id: uuid(),
        username: "Vinnie",
        comment: "OMG, I love Taylor Swift!"
    },
    {
        id: uuid(),
        username: "Etep",
        comment: "Yeah, she's pretty cool."
    },
    {
        id: uuid(),
        username: "Superfan Adam",
        comment: "Shut up, she's literally way more than 'pretty cool'."
    },
    {
        id: uuid(),
        username: "Draven",
        comment: "Soo is anyone going to see the new Crow movie?"
    }
]

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/comments', (req, res) =>{
    res.render('comments/index', { comments })
})

// serves the form itself, will send the data as a POST request to another path where it will be processed and added in to comments array
app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

// post route is where the get form submits its data to, the data is extracted from the body and added to the comments array (fake database)
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments');
})
 
app.get('/comments/:id', (req, res) =>{
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })
    
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})



app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments')
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments')
})

app.get('/tacos', (req, res) => {
    res.send('GET /tacos response')
})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`OK, here are your ${qty} ${meat}`)
})



app.listen(3000, () => {
    console.log('On Port 3000!')
})


// CRUD Functionality Blueprint:

// GET /comments - list all comments
// post /comments - Create a new comment;
// GET /comments/:id - Get one comment (using id)
// PATCH /comments/:id - Update one comment
// DELETE / comments/:id - Destroy one comment

