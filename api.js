import express from 'express'
import bodyParser from "body-parser";



const app = express(); 
const PORT = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const posts= [
{
    id: 1,
    title: "First Post",
    content:
          "This is First Post",
      },


      {
        id: 2,
        title: "Second Post",
        content:
              "This is Second Post",
          },

    ];

app.get('/api/posts', (req, res) => {
    
    res.json(posts)
  
  });


app.post('/api/posts', (req, res) => {
    
    const newPost = {

        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
      }
    
      posts.push(newPost)

      res.json(posts)
    
  
  });


  app.get('/api/posts/:id', (req, res) => {
    
  const id = parseInt(req.params.id);

  const object = posts.find(obj => obj.id === id);

  res.json(object)
  
  });


  app.patch("/api/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const existingPost = posts.find((post) => post.id === id);
    const replacementPost = {
      id: id,
      title: req.body.title || existingPost.title,
      content: req.body.content || existingPost.content,
    };
    const searchIndex = posts.findIndex((post) => post.id === id);
    posts[searchIndex] = replacementPost;
    console.log(posts[searchIndex]);
    res.json(posts);
  });



 
app.delete("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);

  console.log(id)

  const searchIndex = posts.findIndex((post) => post.id === id);
  if (searchIndex > -1) {
    posts.splice(searchIndex, 1);
    res.json(posts);
  } 
  else {
    res.json({ error: `Joke with id: ${id} not found. No jokes were deleted.` });
  }
});

  

  app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 