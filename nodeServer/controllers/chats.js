const users=[];

const addUser=({id,name,room})=>{
  name=name.trim().toLowerCase();
  room=name.trim().toLowerCase();
  const existingUser=users.find(user=>user.room===room && user.name===name)
  if (existingUser){
      return {error:'Username is taken,Sign in with other name'}
  }
  const user={id,name,room}
  users.push(user)
  return user;
}

const removeUser=(id)=>{
  const index=users.findIndex(user=>user.id===id);
  if(index!==-1){
      return users.splice(index,1)[0];
  }
}

const getUser=(id)=>(users.find(user=>user.id===id))



const getUserById=(room)=>(
    users.filter(user=>user.room===room)
)

module.exports={addUser,removeUser,getUser,getUserById};