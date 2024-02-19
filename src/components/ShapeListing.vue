<template>
    <div class="container-fluid">
        <div class="container" style="margin-top: 8%;">
            <div class="row">
                <div class="col">
                    <h2>Shape Details</h2>
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class="bg-dark text-white">
                                    <tr>
                                    <th scope="col">Timestamp</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Shape</th>
                                </tr>
                            </thead>
                            <tbody>
                            <!-- //Display timestamp, name and Shape -->
                                <tr v-for="shape in result" :key="shape.id">
                                    <td>{{ formatTimestamp(shape.updated_at) }}</td>
                                    <td>{{ shape.name }}</td>
                                    <td style="width: 30%">
                                    <!-- //Display the shapes using svg -->
                                        <svg v-if="shape.shape_name === 'rectangle'" width="50" height="30">
                                        <rect width="50" height="30" :fill="shape.colour" />
                                        </svg>
                                        <svg v-else-if="shape.shape_name === 'square'" width="30" height="30">
                                        <rect width="30" height="30" :fill="shape.colour" />
                                        </svg>
                                        <svg v-else-if="shape.shape_name === 'triangle'" width="50" height="50">
                                        <polygon points="25,0 50,50 0,50" :fill="shape.colour" />
                                        </svg>
                                        <svg v-else-if="shape.shape_name === 'circle'" width="30" height="30">
                                        <circle cx="15" cy="15" r="15" :fill="shape.colour" />
                                        </svg>
                                        <svg v-else-if="shape.shape_name === 'oval'" width="50" height="30">
                                        <ellipse cx="25" cy="15" rx="25" ry="15" :fill="shape.colour" />
                                        </svg>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    

</template>

<script>
import axios from 'axios';

export default {
  name: 'ShapeListing',
  data() {
    return {
    // store the data that get in this array
      result: [],
      //data for shape
      shape: {
        id: '',
        name: '',
        shape_name: '',
        colour: '',
        updated_at: '', 
      }
    }
  },
  created() {
    this.getShape();
  },
  methods: {
    //read the shapes data
    getShape() {
      var page = "http://127.0.0.1:8000/api/shapes";
      axios.get(page)
        .then(({ data }) => {
          console.log(data);
          this.result = data; //data is stored in result
        })
        .catch(error => {
          console.error('Error fetching shape data:', error);
        });
    },
    formatTimestamp(timestamp) {
      return new Date(timestamp).toLocaleString(); // Convert timestamp to a readable format
    },
    logout() {
      // Remove the token from local storage
      localStorage.removeItem('token');
      // Redirect to the login page
      this.$router.push('/login');
    },
  }
}

</script>

<style>
.flex {
    display : flex;
    flex-direction: column;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
}

.table-bordered th {
  background-color: #fff;
  color: #000;
}

</style>