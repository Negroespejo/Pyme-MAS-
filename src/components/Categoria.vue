<template>
    <v-layout align-start>
        <v-flex>
          <v-data-table
          :headers="headers"
          :items="categorias"
          
          class="elevation-1"
          :search="search"
           >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Categorias</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
              class="text-xs-center" 
              v-model="search" 
              append-icon="search" 
              label="Buscar categoria" 
              single-line hide-details
              >
              </v-text-field>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
              <!-- <v-dialog v-model="adModal" max-width="250px">
                <v-card>
                    <v-card-title class="headline" v-if="adAccion==1"> ¿Activar Item? </v-card-title> 
                    <v-card-title class="headline" v-if="adAccion==2"> ¿Desctivar Item? </v-card-title>
                    <v-card-text>
                        Estas apunto de
                        <span v-if="adAccion==1">Activar</span>
                        <span v-if="adAccion==2">Desactivar</span>
                        el item {{adNombre}}  
                    </v-card-text>  
                    <v-card-actions>
                      <v-btn color="green darken-1" flat="flat">
                          Cancelar
                      </v-btn>  
                      <v-btn color="orange darken-4" flat="flat">
                          Aceptar
                      </v-btn>              
                    </v-card-actions> 
                </v-card>  
              </v-dialog> -->

            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Nuevo
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    
                      <v-text-field
                        v-model="nombre"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="descripcion"
                        label="Descripción"
                      ></v-text-field>
                       </v-col>
                    
                      
                      <v-alert
                          v-show="valida"
                          border="bottom"
                          colored-border
                          type="warning"
                          elevation="2"
                          
                        >
                        "El nombre debe tener mas de 3 caracteres y menos de 50"
                      </v-alert>                  
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="adModal" max-width="290px">
           <v-card>
                    <v-card-title class="headline" v-if="adAccion==1"> ¿Activar Item? </v-card-title> 
                    <v-card-title class="headline" v-if="adAccion==2"> ¿Desctivar Item? </v-card-title>
                    <v-card-text>
                        Estas apunto de
                        <span v-if="adAccion==1">Activar</span>
                        <span v-if="adAccion==2">Desactivar</span>
                        el item {{adNombre}}  
                    </v-card-text>  
                    <v-card-actions>
                      <v-btn dark @click="activarDesactivarCerrar">
                          Cancelar
                      </v-btn>  
                      <v-btn color="green" class="ma-2" dark v-if="adAccion==1" @click="activar">
                          Activar
                          <v-icon dark right>
                          mdi-checkbox-marked-circle
                          </v-icon>
                      </v-btn>  
                      <v-btn color="red" class="ma-2" dark v-if="adAccion==2" @click="desactivar">
                          Desctivar
                           <v-icon dark right>
                           mdi-cancel
                           </v-icon>
                      </v-btn>             
                    </v-card-actions> 
                </v-card>  
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.opciones`]="{ item }">
        <v-icon
        color="blue"
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>

        <template v-if="item.condicion">
          <v-icon  
            color="green"  
            small
            @click="activarDesactivarMostrar(2,item)"
            >
            mdi-plus
          </v-icon>
        </template>

        <template v-else>
          <v-icon
            color="red"    
            small
            @click="activarDesactivarMostrar(1,item)"
            >
            mdi-cancel
          </v-icon>
        </template>

      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Resetear
        </v-btn>
      </template>
    </v-data-table>
        </v-flex>
    </v-layout>
</template>



<script>
    import axios from 'axios'

    export default {
      
          data(){
            return{
              categorias:[],
              dialog: false,
              dialogDelete: false,
              
              headers: [
                { text: 'Opciones', value: 'opciones', sortable: false },
                { text: 'Nombre', value: 'nombre' },
                { text: 'Descripción', value: 'descripcion', sortable: false  },            
                { text: 'Estado', value: 'condicion', sortable: false  },                
              ],

              search: '',
              desserts: [],
              editedIndex: -1,
              
              id: '',
              nombre: "",
              descripcion: "",
              valida: 0,
              validaMensaje: [],
              //variables para activar y desactivar categorias
              adModal: 0,
              adAccion:0,
              adNombre:'',
              adId:''
              } 
             },

        computed: {
              formTitle () {
                return this.editedIndex === -1 ? 'Nueva Categoría' : 'Actualizar Categoría'
              },
            },

        watch: {
              dialog (val) {
                val || this.close()
              },
              dialogDelete (val) {
                val || this.closeDelete()
              },
            },

        created () {
            this.initialize()
            this.listar()
         },


        methods:{

        initialize(){},

        listar(){
            let me=this;  // Vatiable para perimitr el llamado a this en cualquier
            axios.get('http://localhost:54249/api/Categorias/Listar').then(function(response){
              //console.log(response);
              me.categorias=response.data;
            }).catch(function(error){
              console.log(error);
            });
        },  


        editItem (item) {
            this.id=item.idcategoria;
            this.nombre=item.nombre;
            this.descripcion=item.descripcion;
            this.editedIndex = 1;           
            this.dialog = true;
            this.initialize
          },


        deleteItem (item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
          },

       deleteItemConfirm () {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
          },

        close () {
            this.dialog = false;
            this.listar;
            this.editedIndex = -1;
            this.initialize;
            this.limpiar();
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },

        limpiar(){
            this.id="";
            this.nombre="";
            this.descripcion=""; 
            this.editItem=-1;
        },

        validar(){
            this.valida= 0;
            this.validaMensaje=[];
            if (this.nombre.length<3 || this.nombre.length>50) {
                this.validaMensaje.push("El nombre debe tener mas de 3 caracteres y menos de 50");
            }; 
            if (this.validaMensaje.length){
                this.valida=1;
            }
            return this.valida;
        },

        activarDesactivarMostrar(accion,item){
            this.adModal=1;
            this.adNombre=item.nombre;
            this.adId=item.idcategoria;
            if (accion==1){
                this.adAccion=1;
            }
            else if (accion==2){
                this.adAccion=2;
            }
            else {
                this.adAccion=0;
            }

        },

        activarDesactivarCerrar(){
            this.adModal=0;
        },

        activar(){
            let me=this;
              axios.put('api/Categorias/Activar/'+ this.adId,{}).then(function(response){
                  me.adModal=0;
                  me.adAccion=0;
                  me.adNombre="";
                  me.adId="";
                  me.listar();
                  
              }).catch(function (error) {
                 console.log(error); 
              })  
        },

        desactivar(){
            let me=this;
              axios.put('api/Categorias/Desactivar/'+ this.adId,{}).then(function(response){
                  me.adModal=0;
                  me.adAccion=0;
                  me.adNombre="";
                  me.adId="";
                  me.listar();
                  
              }).catch(function (error) {
                 console.log(error); 
              })
        },

        save () { 
            if (this.validar()){
                return;
            }
            if (this.editedIndex > -1) {
              // EDITAR
              let me=this;
              axios.put('api/Categorias/Actualizar',{
                  'idcategoria':me.id,
                  'nombre':me.nombre,
                  'descripcion':me.descripcion 
              }).then(function(response){
                  me.limpiar();
                  me.listar();
                  me.close();
              }).catch(function (error) {
                 console.log(error); 
              })
            } else {
              let me=this;
              axios.post('api/Categorias/Crear',{
                  'nombre':me.nombre,
                  'descripcion':me.descripcion 
              }).then(function(response){
                  me.limpiar();
                  me.listar();
                  me.close();
              }).catch(function (error) {
                console.log(error); 
              })
          }

          
        
        
    },

  },
    
    


        
}
</script>