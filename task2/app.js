import express from 'express';
const app = express();
const port = 3000;

app.get('/home', (req, res) => {
  res.status(200).send(`
    <html>
      <body>
        <h1 style="color: green;">Welcome to the Home Page</h1>
      </body>
    </html>
  `)
})

app.get('/about', (req, res) => {
  res.status(200).send("This is About page for our Express Server.");
})

app.get("/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  const { department } = req.query;

  const student = {
    studentId,
    department: department || "Not specified",
    name: "Ibsa Abera",
    gender: "Male",
    email: `ibsa.abera${studentId}@gmail.com`
  };

  res.status(200).json(student);
});

app.listen(port, () => {
  console.log(`Express Server is running on http://localhost:${port}`);
})