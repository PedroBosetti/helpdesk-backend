import  Chamados  from "./Chamados.js";
import  Usuarios  from "./Usuarios.js";


// Um usuário pode ter muitas tarefas
Usuarios.hasMany(Chamados, { foreignKey: "usuarioId" });

// Uma tarefa pertence a um usuário
Chamados.belongsTo(Usuarios, { foreignKey: "usuarioId" });