<template>
    <v-layout align-start>
        <v-flex>
          <v-data-table
          :headers="headers"
          :items="articulos"  
          class="elevation-1"
          :search="search"
           >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Articulos</v-toolbar-title>
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
              label="Buscar Articulo" 
              single-line hide-details
              >
              </v-text-field>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
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
                     cols="6"
                     sm="6"
                     md="4"
                     >
                      <v-text-field
                            v-model="codigo"
                            label="Codigo"
                       ></v-text-field>
                    </v-col>
                    <v-col
                      cols="6"
                      sm="6"
                      md="4"
                    >
                      <v-flex>
                          <v-select v-model="idcategoria" 
                              :items="categorias" label="Categoria">
                      </v-select>
                      </v-flex>
                    </v-col>
                
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
                        type="number"
                        v-model="stock"
                        label="Stock"
                      ></v-text-field>
                       </v-col>
                        <v-col
                      cols="6"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        type="number"
                        v-model="precio_venta"
                        label="Precio de Venta"
                      ></v-text-field>
                       </v-col>
                        <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                   <v-text-field
                        v-model="descripcion"
                        label="Descripcion"
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
            return {
                articulos:[],                
                dialog: false,
                headers: [
                    { text: 'Opciones', value: 'opciones', sortable: false },
                    { text: 'Código', value: 'codigo', sortable: false },
                    { text: 'Nombre', value: 'nombre' },
                    { text: 'Categoría', value: 'categoria' },
                    { text: 'Stock', value: 'stock', sortable: false  },
                    { text: 'Precio Venta', value: 'precio_venta', sortable: false  },
                    { text: 'Descripción', value: 'descripcion', sortable: false  },
                    { text: 'Estado', value: 'condicion', sortable: false  }                
                ],
                search: '',
                editedIndex: -1,
                id: '',
                idcategoria:'',
                categorias:[                   
                ],
                codigo: '',
                nombre: '',
                stock: 0,
                precio_venta: 0,
                descripcion: '',
                valida: 0,
                validaMensaje:[],
                adModal: 0,
                adAccion: 0,
                adNombre: '',
                adId: ''             
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nuevo artículo' : 'Actualizar artículo'
            }
        },

        watch: {
            dialog (val) {
            val || this.close()
            }
        },

        created () {
            this.initialize()
            this.listar();
            this.select();
        },
        methods:{
            initialize(){},

            listar(){
                let me=this; // Vatiable para perimitr el llamado a this en cualquier
                axios.get('api/Articulos/Listar').then(function(response){
                    //console.log(response);
                    me.articulos=response.data;
                }).catch(function(error){
                    console.log(error);
                });
            },
            select(){
                let me=this;
                var categoriasArray=[];
                axios.get('api/Categorias/Select').then(function(response){
                    categoriasArray=response.data; 
                    categoriasArray.map(function(x){// arreglo para recorrer el array
                        me.categorias.push({text: x.nombre,value:x.idcategoria});
                    });
                }).catch(function(error){
                    console.log(error);
                });
            },
            editItem (item) {
                this.id=item.idarticulo;
                this.idcategoria=item.idcategoria;
                this.codigo=item.codigo;
                this.nombre=item.nombre;
                this.stock=item.stock;
                this.precio_venta=item.precio_venta;
                this.descripcion=item.descripcion;
                this.editedIndex=1;
                this.dialog = true
            },
            close () {
                this.dialog = false;
                this.limpiar();
            },
            limpiar(){
                this.id="";
                this.idcategoria="";
                this.codigo="";
                this.nombre="";
                this.stock="";
                this.precio_venta="";
                this.descripcion="";
                this.editedIndex=-1;
            },
            save () {
	                if (this.validar()){
	                    return;
	                }
	                if (this.editedIndex > -1) {
	                    //Código para editar
	                    let me=this;
	                    axios.put('api/Articulos/Actualizar',{
	                        'idarticulo':me.id,
	                        'idcategoria':me.idcategoria,
	                        'codigo':me.codigo,
	                        'nombre': me.nombre,
	                        'stock':me.stock,
	                        'precio_venta':me.precio_venta,
	                        'descripcion': me.descripcion
	                    }).then(function(response){
	                        me.close();
	                        me.listar();
	                        me.limpiar();                        
	                    }).catch(function(error){
	                        console.log(error);
	                    });
	                } else {
	                    //Código para guardar
	                    let me=this;
	                    axios.post('api/Articulos/Crear',{
	                        'idcategoria':me.idcategoria,
	                        'codigo':me.codigo,
	                        'nombre': me.nombre,
	                        'stock':me.stock,
	                        'precio_venta':me.precio_venta,
	                        'descripcion': me.descripcion
	                    }).then(function(response){
	                        me.close();
	                        me.listar();
	                        me.limpiar();                        
	                    }).catch(function(error){
	                        console.log(error);
	                    });
	                }
            },
            validar(){
                this.valida=0;
                this.validaMensaje=[];

                if (this.nombre.length<3 || this.nombre.length>50){
                    this.validaMensaje.push("El nombre debe tener más de 3 caracteres y menos de 50 caracteres.");
                }
                if (!this.idcategoria){
                    this.validaMensaje.push("Seleccione una categoría.");
                }
                if (!this.stock || this.stock==0){
                    this.validaMensaje.push("Ingrese el stock inicial del artículo.");
                }
                if (!this.precio_venta || this.precio_venta==0){
                    this.validaMensaje.push("Ingrese el precio de venta del artículo.");
                }
                if (this.validaMensaje.length){
                    this.valida=1;
                }
                return this.valida;
            },
            activarDesactivarMostrar(accion,item){
                this.adModal=1;
                this.adNombre=item.nombre;
                this.adId=item.idarticulo;                
                if (accion==1){
                    this.adAccion=1;
                }
                else if (accion==2){
                    this.adAccion=2;
                }
                else{
                    this.adModal=0;
                }
            },
            activarDesactivarCerrar(){
                this.adModal=0;
            },
            activar(){
                let me=this;
                axios.put('api/Articulos/Activar/'+this.adId,{}).then(function(response){
                    me.adModal=0;
                    me.adAccion=0;
                    me.adNombre="";
                    me.adId="";
                    me.listar();                       
                }).catch(function(error){
                    console.log(error);
                });
            },
            desactivar(){
                let me=this;
                axios.put('api/Articulos/Desactivar/'+this.adId,{}).then(function(response){
                    me.adModal=0;
                    me.adAccion=0;
                    me.adNombre="";
                    me.adId="";
                    me.listar();                       
                }).catch(function(error){
                    console.log(error);
                });
            }
        }        
    }
</script>