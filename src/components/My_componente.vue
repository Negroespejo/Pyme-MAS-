<template>
<v-content>
  <div>
    <h2> hola desde el componente</h2>
    
    <h3>{{ texto }}</h3>
    
    
  </div>
</v-content>  
</template>

<script>
export default {
  name: 'mi_componente',
  props: {
    
  },
  
  data(){
      return {
          texto: "Propiedad ¡¡¡texto!!!  desde mi componente"
      }
      
  }
  
}
</script>
