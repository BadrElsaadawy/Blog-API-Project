import express from 'express'
import bodyParser from "body-parser";
import axios from 'axios'
  
const app = express(); 
const PORT = 3000; 
const API_URL = "http://localhost:4000"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
  
app.get('/', async (req, res)=>{ 
    
  try {

    const result = await axios.get(API_URL + "/api/posts");

    //console.log(result.data)
    
    res.render("index.ejs", { content: result.data });

    
  } 
  catch (error) {
    res.render("index.ejs", { error: "Looks like error with API" });
  }

}); 

app.post('/create-new-post', (req, res)=>{ 
    
    res.render("create-new-post.ejs"); 

}); 


app.post('/submit-new-post', async (req, res)=>{ 
    
    try {

        const result = await axios.post(API_URL + "/api/posts", req.body );

        console.log(req.body)
        console.log( result.data )

        res.render("index.ejs", { content: result.data } );
      } 

    

    catch (error) {
      res.render("index.ejs", { error: "Looks like error with API"}); }


}); 


app.post('/modify-post', async (req, res)=>{ 

  try {

    const postid= req.body.postId

    console.log(postid + "HII")

    const result = await axios.patch(API_URL + `/api/posts/${postid}`, req.body);

    console.log(req.body)
    console.log( result.data )

    res.render("index.ejs", { content: result.data } );

    console.log(req.query.post_id)
  } 
  
  catch (error) {


    res.render("index.ejs", { error: "Looks like error with API" }); }
    


});


app.get('/edit-post',  async (req, res)=>{ 
  
  try {

    const postid= req.query.post_id

    const result = await axios.get(API_URL + `/api/posts/${postid}` );

    console.log(req.body)
    console.log( result.data )

    res.render("modify-post.ejs", { content: result.data } );

    console.log(req.query.post_id)
  } 



catch (error) {
  res.render("modify-post.ejs", { error: "Looks like error with API" }); }
}); 



app.get('/delete-post',  async (req, res)=>{ 
  
    try {

    const postid= req.query.post_id
    
    const result = await axios.delete(API_URL + `/api/posts/${postid}`, req.body );

    res.render("index.ejs", { content: result.data } );

    console.log(req.query.post_id)
  } 


catch (error) {
  res.render("index.ejs", { error: "Looks like error with API" }); }
}); 
 
  
app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 