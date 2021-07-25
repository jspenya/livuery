<template>
  <section style="padding-bottom:60px;">
    <div class="container">
      <div class="row no-gutters">
        <div class="col"></div>
        <div class="col-md-10 px-5 pt-5">
          <h1 class="addstudent-text">Add a New Student</h1>
          <form action="" @submit.prevent="addStudent">
            <div class="form-row">
              <div class="">
                <input
                  id="student_title"
                  class="form-control my-2 p-3"
                  autofocus autocomplete="off"
                  placeholder="Enter student's LRN"
                  v-model="newStudent.lrn" />
              </div>
            </div>
            <div class="form-row">
              <div class="">
                <input
                  id="student_author"
                  class="form-control my-2 p-3"
                  autofocus autocomplete="off"
                  placeholder="Enter student's first name"
                  v-model="newStudent.firstname" />
              </div>
            </div>
            <div class="form-row">
              <div class="">
                <input
                  id="student_description"
                  class="form-control my-2 p-3"
                  autofocus autocomplete="off"
                  placeholder="Enter student's last name"
                  v-model="newStudent.lastname" />
              </div>
            </div>
            <div class="form-row">
              <div class="">
              <button type="submit" value="Add Student" class="btn1 mt-3 mb-3">Add Student</button>
              </div>
            </div>
          </form>
          <hr class="border border-grey-light my-6" />
          <table class="table">
            <thead>
              <tr>
                <th scope="col">LRN</th>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody v-for="student in students" :key="student.id" :student="student">
              <tr>
                <td>{{ student.lrn }}</td>
                <td>{{ student.firstname }}</td>
                <td>{{ student.lastname }}</td>
                <td>
                  <button class="btn btn-success" @click.prevent="editStudent(student)">Edit</button>
                  <button class="btn btn-danger" @click.prevent="removeStudent(student)">Delete</button>
                </td>
              </tr>
              <div v-if="student == editedStudent">
                <form action="" @submit.prevent="updateStudent(student)">
                  <div class="mb-6 p-4 bg-white rounded border border-grey-light mt-4">
                    <div class="mb-3">
                      <label class="label">LRN</label>
                      <input class="form-control my-2 p-3" v-model="student.lrn" />
                    </div>
                    <div class="mb-6">
                      <label class="label">Firstname</label>
                      <input class="form-control my-2 p-3" v-model="student.firstname" />
                    </div>
                    <div class="mb-6">
                      <label class="label">Lastname</label>
                      <input class="form-control my-2 p-3" v-model="student.lastname" />
                    </div>
                    <input type="submit" value="Update" class="btn btn-success">
                  </div>
                </form>
              </div>
            </tbody>
          </table>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'students',
  data () {
    return {
      students: [],
      newStudent: [],
      error: '',
      editedStudent: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/api/v1/students')
        .then(response => { this.students = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    addStudent () {
      const value = this.newStudent
      if (!value) {
        return
      }
      this.$http.secured.post('/api/v1/students/', {student: {lrn: this.newStudent.lrn, firstname: this.newStudent.firstname, lastname: this.newStudent.lastname}})

        .then(response => {
          this.students.push(response.data)
          this.newStudent = ''
        })
        .catch(error => this.setError(error, 'Cannot create student'))
    },
    removeStudent (student) {
      this.$http.secured.delete(`/api/v1/students/${student.id}`)
        .then(response => {
          this.students.splice(this.students.indexOf(student), 1)
        })
        .catch(error => this.setError(error, 'Cannot delete student'))
    },
    editStudent (student) {
      this.editedStudent = student
    },
    updateStudent (student) {
      this.editedStudent = ''
      this.$http.secured.patch(`/api/v1/students/${student.id}`, {student: {lrn: student.lrn, firstname: student.firstname, lastname: student.lastname}})
        .catch(error => this.setError(error, 'Cannot update student'))
    }
  }
}
</script>

<style scoped>
.addstudent-text {
font-weight: bold;
}
.row{
background: white;
border-radius: 30px;
}
img{
border-top-left-radius: 30px;
border-bottom-left-radius: 30px;
}
.btn1{
border: none;
outline: none;
height: 50px;
width: 100%;
background-color: black;
color:white;
border-radius: 4px;
font-weight: bold;
}
.btn1:hover{
background: white;
border: 1px solid;
color: black;
}
</style>
