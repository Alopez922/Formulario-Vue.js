Vue.component("usuario-add",{
    template:`
    <div>
    
   
    <table>
    <th>
    <label>Nombre</label>
    </th>
    <th>
    <label>Apellido</label>
    </th>
    <th>
    <label>Usuario</label>
    </th>
    <th>
    <label>Fecha de nacimiento</label>
    </th>
    <tr>
    <td>
    <input type="text" v-model="nombre">
    </td>
    <td>
    <input type="text" v-model="apellido">
    </td>
    <td>
    <input type="text" v-model="usuario">
    </td>
    <td>
    <input type="date" v-model="edad">
    </td>
    </tr>

    <button @click="onClick">Guardar</button>    
    </div>
    `,
    data:function(){
        return{
            nombre:null,
            apellido:null,
            usuario:null,
            edad:null
        }
    },

    methods:{
        onClick:function(){
            let fecha = new Date()
            this.$emit("new",{nombre:this.nombre, apellido:this.apellido, usuario:this.usuario, edad:Math.abs(this.edad.slice(0,4)-fecha.getFullYear())})

        }
    }

})


Vue.component("usuario-item",{
    props:["usuario"],
    template:`
    <li>
        <div>
        Nombre Completo: {{usuario.nombre}} {{usuario.apellido}} 
        Usuario:{{usuario.usuario}}
        Edad:{{usuario.edad}}  
        </div>
    </li>
    `
})

Vue.component("usuario-list",{
    props:["usuarios"],
    template:`
    
    <ul>
    <usuario-item 
    v-for="(usuario,index) in usuarios"
    :key="index"
    :usuario="usuario">
    </usuario-item>
    </ul>
    `
})

const app = new Vue({
    el:"#app",
    data:{
        usuarios:[]
    },

    template:`
    <div>
    <usuario-list :usuarios="usuarios"></usuario-list>
    <usuario-add @new="addNewUsuario"></usuario-add>
    </div>
    `,

    methods:{
        addNewUsuario:function(usuario){
            let usuariorepe = this.usuarios.filter(el=>el.usuario === usuario.usuario)
            if(usuariorepe.length > 0){
                return alert(`usuario existente`)
            }else{
                this.usuarios.push(usuario)
            }
           
        }
    }

})