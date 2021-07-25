<template>
  <section style="padding-bottom:60px;">
    <div class="container">
      <div class="row no-gutters">
        <div class="col-md-1"></div>
        <div class="col-md-10 px-5 pt-5">
          <h1 class="addbook-text">New Borrow Record</h1>
          <form action="" @submit.prevent="addBorrowedbook">
            <div class="mb-3">
              <div>
                <label for="book"><b>Select Book</b></label>
                <select id="book" class="form-select" aria-label="Default select example" v-model="newBorrowedbook.availableBook" required="true">
                  <option disabled value="">Select a Book</option>
                  <option :value="availableBook.id" v-for="availableBook in availableBooks" :key="availableBook.id">{{ availableBook.title }}</option>
                </select>
                <p class="pt-4" style="margin-bottom:2rem;">Don't see a book? <router-link class="text-grey-darker underline" to="/books">Create one</router-link></p>
              </div>
            </div>
            <div class="mb-3">
              <div class="">
                <label for="book" class="label"><b>Select Student</b></label>
                <select id="book" class="form-select" aria-label="Default select example" v-model="newBorrowedbook.student" required="true">
                  <option disabled value="">Select a Student</option>
                  <option :value="student.id" v-for="student in students" :key="student.id">{{ student.lastname }}, {{ student.firstname }}</option>
                </select>
                <p class="pt-4" style="margin-bottom:2rem;">Don't see a student? <router-link class="text-grey-darker underline" to="/students">Go here</router-link></p>
              </div>
            </div>
            <div class="mb-3">
              <div class="">
              <button type="submit" value="Add Book" class="btn1 mt-3 mb-3">Add Record</button>
              </div>
            </div>
          </form>
          <hr class="border border-grey-light my-6" />
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Borrow Date</th>
                <th scope="col">Book Title</th>
                <th scope="col">Student Name</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody v-for="borrowedBook in borrowedBooks" :key="borrowedBook.id" :borrowedBook="borrowedBook">
              <tr>
                <td>{{borrowedBook.created_at}}</td>
                <td>{{getBook(borrowedBook)}}</td>
                <td>{{getStudent(borrowedBook)}}</td>
                <td v-if="borrowedBook.return_date == nil">Unreturned</td>
                <td v-else>Returned</td>
                <td>
                  <button class="btn btn-success" @click.prevent="editBorrowedbook(borrowedBook)">Edit</button>
                  <button class="btn btn-danger"
                @click.prevent="removeBorrowedbook(borrowedBook)">Delete</button>
                  <div v-if="borrowedBook.return_date == null">
                    <button class="btn btn-warning" style="margin-top:5px;" @click.prevent="returnBorrowedbook(borrowedBook)">Return</button>
                  </div>
                </td>
              </tr>
              <div v-if="borrowedBook == editedBorrowedbook">
                <form action="" @submit.prevent="updateBorrowedbook(borrowedBook)">
                  <div class="form-row">
                    <div>
                      <label class="label">Book</label>
                      <select id="book" required="true" class="form-select" aria-label="Default select example" v-model="borrowedBook.book">
                        <option disabled value="">Select a Book</option>
                        <option :value="book.id" v-for="book in books" :key="book.id">{{ book.title }}</option>
                      </select>
                      <label class="label">Student</label>
                      <select id="book" required="true" style="margin-bottom:30px;" class="form-select" aria-label="Default select example" v-model="borrowedBook.student">
                        <option disabled value="">Select a Student</option>
                        <option :value="student.id" v-for="student in students" :key="student.id">{{student.lastname}}</option>
                      </select>
                      <input type="submit" value="Update" class="btn btn-success">
                    </div>
                  </div>
                </form>
              </div>
            </tbody>
          </table>
        </div>
        <div class="col-md-1"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'books',
  data () {
    return {
      borrowedBooks: [],
      books: [],
      availableBooks: [],
      students: [],
      newBorrowedbook: [],
      error: '',
      editedBorrowedbook: '',
      returnedBorrowedbook: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/api/v1/borrowed_books')
        .then(response => { this.borrowedBooks = response.data })
        .catch(error => this.setError(error, 'Something went wrong with fetching borrowed books'))
      this.$http.secured.get('/api/v1/books')
        .then(response => { this.books = response.data })
        .catch(error => this.setError(error, 'Something went wrong with fetching books'))
      this.$http.secured.get('/api/v1/books/available')
        .then(response => { this.availableBooks = response.data })
        .catch(error => this.setError(error, 'Something went wrong with fetching available books'))
      this.$http.secured.get('/api/v1/students')
        .then(response => { this.students = response.data })
        .catch(error => this.setError(error, 'Something went wrong with fetching students'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    getBook (borrowedBook) {
      const borrowedBookValues = this.books.filter(book => book.id === borrowedBook.book_id)
      let book

      borrowedBookValues.forEach(function (element) {
        book = element.title
      })

      return book
    },
    getStudent (borrowedBook) {
      const borrowedBookValues = this.students.filter(student => student.id === borrowedBook.student_id)
      let student

      borrowedBookValues.forEach(function (element) {
        student = element.lastname + ", " + element.firstname
      })

      return student
    },
    addBorrowedbook () {
      const value = this.newBorrowedbook
      if (!value) {
        return
      }
      this.$http.secured.post('/api/v1/borrowed_books/', {borrowed_book: { book_id: this.newBorrowedbook.availableBook, student_id: this.newBorrowedbook.student }})

        .then(response => {
          this.borrowedBooks.push(response.data)
          this.newBorrowedbook = ''
          window.location.reload()
          return false
        })
        .catch(error => this.setError(error, 'Cannot create record'))
    },
    removeBorrowedbook (borrowedBook) {
      this.$http.secured.delete(`/api/v1/borrowed_books/${borrowedBook.id}`)
        .then(response => {
          this.borrowedBooks.splice(this.borrowedBooks.indexOf(borrowedBook), 1)
          window.location.reload()
          return false
        })
        .catch(error => this.setError(error, 'Cannot delete record'))
    },
    editBorrowedbook (borrowedBook) {
      this.editedBorrowedbook = borrowedBook
    },
    returnBorrowedbook (borrowedBook) {
      this.$http.secured.post(`/api/v1/borrowed_books/${borrowedBook.id}/return_book/`)
        .then(response => {
          this.borrowedBooks.push(response.data)
          window.location.reload()
          return false
        })
        .catch(error => this.setError(error, 'Cannot return book'))
    },
    updateBorrowedbook (borrowedBook) {
      this.editedBorrowedbook = ''
      this.$http.secured.patch(`/api/v1/borrowed_books/${borrowedBook.id}`, {borrowed_book: {book_id: borrowedBook.book, student_id: borrowedBook.student}})
        .catch(error => this.setError(error, 'Cannot update record'))
      window.location.reload()
      return false
    }
  }
}
</script>

<style scoped>
.addbook-text {
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
background: rgb(56, 45, 45);
border: 1px solid;
color: #fff;
}
</style>
