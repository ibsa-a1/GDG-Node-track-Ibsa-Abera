let users = [
  { id: 1, name: "Abel Tesfaye", email: "abel@example.com", age: 22 },
  { id: 2, name: "Sara Ahmed", email: "sara@example.com", age: 20 },
  { id: 3, name: "John Doe", email: "john@example.com", age: 25 }
];

let lastId = users.length;

export const getAllUsers = (req, res) => {
  res.status(200).json(users);
};

export const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
};

export const createUser = (req, res) => {
  const { name, email, age } = req.body;

  const newUser = {
    id: ++lastId,
    name,
    email,
    age
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

export const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, email, age } = req.body;
  user.name = name;
  user.email = email;
  user.age = age;

  res.status(200).json(user);
};

export const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  users = users.filter(u => u.id !== id);
  res.status(200).json({ message: "User deleted" });
};
