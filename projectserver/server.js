const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();
const mysql = require("mysql2/promise");
const connectDb = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "project",
  connectionLimit: 10
})

app.use(cors());
// app.use(express.static('public'));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.get('/', (req, res) => res.send("1"));

app.get("/user/:category", async (req, res) => {
  const category = req.params.category.substring(1);
  try {
    let query = `select p1.img,p1.name, p1.profile, p1.job, p2.CategoryName
    from
    (select * from people where id in
      (select peopleId from peoplecategory where categoryId = 
        (select id from category where CategoryName = "${category}")
      )
    ) p1,
    (select p1.peopleId,p2.CategoryName from
      (select peopleId, categoryId from peoplecategory where peopleId in
        (select peopleId from peoplecategory where categoryId in 
          (select id from category where CategoryName = "${category}")
        )
      ) p1,
      (select * from category where id in 
        (select categoryId from peoplecategory where peopleId in
          (select peopleId from peoplecategory where categoryId in 
            (select id from category where CategoryName = "${category}")
          )
        )
      )p2
      where p1.categoryId = p2.id
    )p2
    where p1.id = p2.peopleId;`
    let resData = await connectDb.query(query);
    return res.send(resData)
  } catch (err) {
    console.error(err);
  }
});
app.get("/post",async (req,res)=> {
  try {
    let query = `select contents.title,contents.content,people.name,contents.source
    from contents,people where contents.author = people.id;`;
    let resPostingData = await connectDb.query(query);
    return res.send(resPostingData)
  }catch (e){
    console.error(e);
  }
})

app.listen(9000, () => console.log(`server start on port 9000`))