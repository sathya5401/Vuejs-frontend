<template>
  <div class="container-fluid">
    <div class="container">
      <div class="row">
        <h2>Shape Registration</h2>
      </div>
      <!-- form to add/edit data -->
      <form @submit.prevent="save" class="form-inline">
        <div class="row form-row">
          <!-- name -->
          <div class="col-4 form-group">
            <label style="margin-right: 83%;">Name:</label>
            <input type="text" v-model="shape.name" class="form-control" placeholder="Name">
            <!-- Display name error message -->
            <p v-if="errors.name" class="error">{{ errors.name }}</p>
          </div>
          <!-- dropdown list of shape -->
          <div class="col-3 form-group">
            <label style="margin-right: 55%;">Shape Name:</label>
            <select v-model="shape.shape_name" class="form-control">
              <option value="square">Square</option>
              <option value="triangle">Triangle</option>
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
              <option value="oval">Oval</option>
            </select>
            <!-- Display shape_name error message -->
            <p v-if="errors.shape_name" class="error">{{ errors.shape_name }}</p>
          </div>
          <!-- colour of shape -->
          <div class="col-3 form-group">
            <label style="margin-right: 80%;">Colour:</label>
            <input type="text" v-model="shape.colour" class="form-control" placeholder="Colour">
            <!-- Display colour error message -->
            <p v-if="errors.colour" class="error">{{ errors.colour }}</p>
          </div>
          <div class="col-2" style="margin-top: 2%;">
            <button type="submit" class="btn btn-primary">Add</button>
          </div>
        </div>
      </form>
    </div>

    <!-- display the data -->
    <div class="container">
      <div class="row">
        <div class="col" style="margin-top: 3%;">
          <h2>Shape Details</h2>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead class="bg-dark text-white">
                <tr>
                  <th scope="col">Timestamp</th>
                  <th scope="col">Name</th>
                  <th scope="col">Shape</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
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
                  <td>
                    <!-- buttons to edit and delete -->
                    <button type="button" class="btn btn-warning btn-spc" @click="edit(shape)">Edit</button>
                    <button type="button" class="btn btn-danger btn-spc" @click="remove(shape)">Delete</button>
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
  name: 'ShapeDetails',
  data() {
    return {
      //response data stored in result
      result: [],
      //data for shapes
      shape: {
        id: '',
        name: '',
        shape_name: '',
        colour: '',
        updated_at: '',
      },
      // Error messages stored in erros
      errors: {},
    };
  },
  created() {
    this.getShape();
  },
  methods: {
    //read the shapes data to store in result
    getShape() {
      var page = "http://127.0.0.1:8000/api/shapes";
      axios.get(page)
        .then(({ data }) => {
          console.log(data);
          this.result = data; //shapes data
        })
        .catch(error => {
          console.error('Error fetching shape data:', error);
        });
    },
    save() {
      
      this.errors = {};

      // Validate form
      if (!this.shape.name) {
        this.errors.name = 'Name is required';
      }
      if (!this.shape.shape_name) {
        this.errors.shape_name = 'Shape Name is required';
      }
      if (!this.shape.colour) {
        this.errors.colour = 'Colour is required';
      }

      // Check if there are any errors
      if (Object.keys(this.errors).length === 0) {
        // If no errors, proceed to save data
        if (this.shape.id == '') {
          // If it is empty then saveData as new Data
          this.saveData();
        } else {
          // If it is not then data existed and it is being updated
          this.updateData();
        }
      }
    },
    //save newly add data
    saveData() {
      axios.post('http://127.0.0.1:8000/api/shapes', this.shape)
        .then(response => {
          console.log('Shape saved successfully:', response.data);
          this.clearForm(); //clear form once submit and data is updated in database
          this.getShape(); //call this method to read latest data and display it
        })
        .catch(error => {
          console.error('Error saving shape:', error);
        });
    },
    edit(shape) {
      // clone the existing the shape data for update
      this.shape = { ...shape };
    },
    updateData() {
      //get the api url with shape id
      var url = `http://127.0.0.1:8000/api/shapes/${this.shape.id}`;

      axios.put(url, this.shape)
        .then(response => {
          console.log('Shape updated successfully:', response.data);
          this.clearForm(); //clear form once submit and data is updated in database
          this.getShape(); //call this method to read latest data and display it
        })
        .catch(error => {
          console.error('Error updating shape:', error);
        });
    },
    //delete the data
    remove(shape) {
      //get the api url with shape id
      var url = `http://127.0.0.1:8000/api/shapes/${shape.id}`;

      axios.delete(url)
        .then(response => {
          console.log('Shape deleted successfully:', response.data);
          this.getShape(); //call this method to read latest data and display it after deletion
        })
        .catch(error => {
          console.error('Error deleting shape:', error);
        });
    },
    formatTimestamp(timestamp) {
      return new Date(timestamp).toLocaleString();
    },
    clearForm() {
      this.shape = {
        id: '',
        name: '',
        shape_name: '',
        colour: '',
        updated_at: '',
      };
    },
  },
};
</script>

<style scoped>
.form-row {
  margin-top: 2%;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
}

.table-bordered th {
  background-color: #fff;
  color: #000;
}

.flex-buttons {
  display: flex;
  flex-direction: row;
}

.btn-spc {
  margin: 1%;
}

.error {
  color: red;
}
</style>
