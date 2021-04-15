<template>
  <v-app>
   <v-card
    color="grey lighten-4"
    flat
    height="100%"
    tile
  >
  <v-app-bar
        dense 
        color="deep-purple accent-4"
        dark
        
      
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <span>
            Proyecto versión beta 1.0
          </span>
      </v-toolbar-title>
          <v-img
            fixed
            max-height="50"
            max-width="100"
            src="LogoPymeMas.jpg">
          </v-img>
      <v-spacer></v-spacer>
     
        <v-btn @click="salir" icon>
          <v-icon>logout</v-icon>Salir
        </v-btn>
      </v-app-bar>
  </v-card>
     <v-navigation-drawer
      clipped 
      v-model="drawer"
      fixed
      app
      temporary
      >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Nombre de la sesión
          </v-list-item-title>
          <v-list-item-subtitle>
            estado de la sesión
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense>
        <template>
          <v-list-item :to="{ name: 'Home'}">
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                 <v-list-item-title>Home</v-list-item-title>
             </v-list-item-content>
            </v-list-item>
            <!--Componente para pruebas-->      
            <!--</template>
              <v-layout>
                <v-flex>
              <v-btn block :to="{name: 'mi_componente'}"> Mi componente</v-btn>
            </v-flex>
          </v-layout>
          <template>-->
      <v-list-group>
      <v-list-item slot="activator">
        <v-list-item-content>
          <v-list-item-title>
            Almacén
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      
       <v-list-item :to="{name: 'articulo'}">
        <v-list-item-content>
          <v-list-item-title>
            Articulo
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item >
       <v-list-item :to="{name: 'categoria'}">
        <v-list-item-content>
          <v-list-item-title>
            Categoria
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>    
    </v-list-group>
    </template>
<template>
      <v-list-group>
      <v-list-item slot="activator">
        <v-list-item-content>
          <v-list-item-title>
            Compras
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      
       <v-list-item :to="{name: 'Proveedores'}">
        <v-list-item-content>
          <v-list-item-title>
            Proveedor
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item >
       <v-list-item :to="{name: 'Ingresos'}">
        <v-list-item-content>
          <v-list-item-title>
            Orden de compra
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>    
    </v-list-group>
    </template>
<template>
      <v-list-group>
      <v-list-item slot="activator">
        <v-list-item-content>
          <v-list-item-title>
            Ventas
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      
       <v-list-item :to="{name: 'clientes'}">
        <v-list-item-content>
          <v-list-item-title>
            clientes
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item >
       <v-list-item :to="{name: 'OrdenDeVentas'}">
        <v-list-item-content>
          <v-list-item-title>
            Orden de venta
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>    
    </v-list-group>
    </template>
    <template>
      <v-list-group>
      <v-list-item slot="activator">
        <v-list-item-content>
          <v-list-item-title>
            Accesos
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      
       <v-list-item :to="{name: 'usuarios'}">
        <v-list-item-content>
          <v-list-item-title>
            Usuario
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item >
       <v-list-item :to="{name: 'roles'}">
        <v-list-item-content>
          <v-list-item-title>
            Rol
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>    
    </v-list-group>
    </template>
    <template>
      <v-list-group>
      <v-list-item slot="activator">
        <v-list-item-content>
          <v-list-item-title>
            Consultas
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      
       <v-list-item :to="{name: 'ConsultaCompras'}">
        <v-list-item-content>
          <v-list-item-title>
            Consultas de compras
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item >
       <v-list-item :to="{name: 'ConsultaVentas'}">
        <v-list-item-content>
          <v-list-item-title>
            Consultas de ventas
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>    
    </v-list-group>
    </template>










</v-list>
    </v-navigation-drawer>


  <v-container> 
      
    <v-slide-y-reverse-transition mode="out-in">
      <router-view></router-view>
    </v-slide-y-reverse-transition>
       
  </v-container>
 </v-app>
</template>













<script>
export default {
  name: 'App',
  components: {
    
    
  },
  methods:{

  },
    

  data: () => ({
    drawer: null,
    collapseOnScroll: true,
  }),
};
</script>
