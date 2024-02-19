<template>
  <div>
    <select v-model="selectedShape">
      <option value="square">Square</option>
      <option value="triangle">Triangle</option>
      <option value="rectangle">Rectangle</option>
      <option value="circle">Circle</option>
    </select>

    <!-- Render selected shape -->
    <div v-if="selectedShape === 'square'">
      <svg width="100" height="100">
        <rect width="100" height="100" fill="red" />
      </svg>
    </div>
    <div v-else-if="selectedShape === 'triangle'">
      <svg width="100" height="100">
        <polygon points="50,0 100,100 0,100" fill="blue" />
      </svg>
    </div>
    <div v-else-if="selectedShape === 'rectangle'">
      <svg width="150" height="100">
        <rect width="150" height="100" fill="green" />
      </svg>
    </div>
    <div v-else-if="selectedShape === 'circle'">
      <svg width="100" height="100">
        <circle cx="50" cy="50" r="50" fill="yellow" />
      </svg>
    </div>
  </div>

  <svg width="100" height="50">
  <ellipse cx="50" cy="25" rx="50" ry="25" fill="orange" />
</svg>

<svg width="100" height="100">
  <polygon points="10,10 90,10 90,90" fill="red" />
</svg>


  <div class="container" style="margintop: 2%;">
    <h1>Hello, Bootstrap!</h1>
    <button class="btn btn-primary">Click me</button>
  </div>
</template>

<script>
export default {
  name : 'HelloWorld',
  data() {
    return {
      selectedShape: 'square'
    };
  }
};
</script>
