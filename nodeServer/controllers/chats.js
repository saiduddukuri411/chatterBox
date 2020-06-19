const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  let user = null,
    error = null;
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );
  if (existingUser) {
    return { error: "Username is taken,Sign in with other name", user };
  }
  user = { id, name, room };
  users.push(user);
  return { error, user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const checkUserByRoom = (room, name) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  let  lis=users.map((userLis) => {
    console.log(userLis.room,userLis.name)
    if (userLis.room === String(room)) {
      if (userLis.name === String(name)) {
        return true
      }
    }
  });
  if (lis.length>0){
    if(lis[0]){
      return true
    }
  }
    return false
};

const getUserById = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUserById, checkUserByRoom,users };
