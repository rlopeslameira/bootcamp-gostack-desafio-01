const express = require("express");

const server = express();

server.use(express.json());

let qtdreq = 0;

const projects = [
  {
    id: "1",
    title: "Site do GoStack",
    tasks: ["Instalar CMS", "Criar Layout", "Criar as Páginas"]
  },
  {
    id: "2",
    title: "Migração dos dados da Microsft",
    tasks: [
      "Verificar estrutura das tabelas",
      "Criar programa para ler as tabelas e exportar para Excel"
    ]
  }
];

// MID COUNT
server.use("/", (req, res, next) => {
  console.time("time");

  qtdreq++;

  next();

  console.timeEnd("time");
  console.log(`Total requests: ${qtdreq}`);
});

// MID CHECK IF PROJECT EXISTS
function checkProjectExists(req, res, next) {
  const { id } = req.params;

  const index = projects.findIndex(reg => reg.id == id);

  const project = projects[index];

  if (!project) {
    return res.status(400).json({ error: "Project not found." });
  }

  next();
}

// LIST PROJETC
server.get("/", (req, res) => {
  return res.json({ message: "Servidor UP" });
});

// LIST PROJETC
server.get("/projects", (req, res) => {
  return res.json(projects);
});

// CREATE PROJETC
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
});

// UPDATE PROJETC
server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const { title } = req.body;

  const project = projects.find(reg => reg.id == id);

  project.title = title;

  return res.json(project);
});

// DELETE PROJETC
server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(reg => reg.id == id);

  projects.splice(index, 1);

  return res.json(projects);
});

// CREATE TASKS
server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(reg => reg.id == id);

  project.tasks.push(title);

  return res.json(projects);
});

server.listen(3333);
