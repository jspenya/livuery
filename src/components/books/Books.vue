<template>
  <section style="padding-bottom:60px;">
    <div class="container">
      <div class="row no-gutters">
        <div class="col"></div>
        <div class="col-md-10 px-5 pt-5">
          <h1 class="addbook-text">Add a New Book</h1>
          <form action="" @submit.prevent="addBook">
            <div class="form-row">
              <div class="">
                <input
                  id="book_title"
                  class="form-control my-2 p-3"
                  autofocus autocomplete="off"
                  placeholder="Enter book name"
                  v-model="newBook.title" />
              </div>
            </div>
            <div class="form-row">
              <div class="">
                <input
                  id="book_author"
                  class="form-control my-2 p-3"
                  autofocus autocomplete="off"
                  placeholder="Enter book's author"
                  v-model="newBook.author" />
              </div>
            </div>
            <div class="form-row">
              <div class="">
                <input
                  id="book_description"
                  class="form-control my-2 p-3"
                  autofocus autocomplete="off"
                  placeholder="Enter book's description"
                  v-model="newBook.description" />
              </div>
            </div>
            <div class="form-row">
              <div class="">
                <input
                  id="book_isbn"
                  class="form-control my-2 p-3"
                  autofocus autocomplete="off"
                  placeholder="Enter book's ISBN"
                  v-model="newBook.isbn" />
              </div>
            </div>
            <div class="form-row">
              <div class="">
                <input
                  id="book_publisher"
                  class="form-control my-2 p-3"
                  autofocus autocomplete="off"
                  placeholder="Enter book's publisher"
                  v-model="newBook.publisher" />
              </div>
            </div>
            <div class="form-row">
              <div class="">
              <button type="submit" value="Add Book" class="btn1 mt-3 mb-3">Add Book</button>
              </div>
            </div>
          </form>
          <hr class="border border-grey-light my-6" />
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ISBN</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Availability</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody v-for="book in books" :key="book.id" :book="book">
              <tr>
                <td>{{ book.isbn }}</td>
                <td>{{ book.title }}</td>
                <td>{{ book.author }}</td>
                <td v-if="book.is_available == true">Available</td>
                <td v-else>Unavailable</td>
                <td>
                  <button class="btn btn-success" @click.prevent="editBook(book)">Edit</button>
                  <button class="btn btn-danger" @click.prevent="removeBook(book)">Delete</button>
                </td>
              </tr>
              <div class="form-row" v-if="book == editedBook">
                <form action="" @submit.prevent="updateBook(book)">
                  <div class="mb-6 p-4 bg-white rounded border border-grey-light mt-4">
                    <div class="mb-3">
                      <label class="label">Title</label>
                      <input class="form-control my-2 p-3" v-model="book.title" />
                    </div>
                    <div class="mb-3">
                      <label class="label">Author</label>
                      <input class="form-control my-2 p-3" v-model="book.author" />
                    </div>
                    <div class="mb-3">
                      <label class="label">ISBN</label>
                      <input class="form-control my-2 p-3" v-model="book.isbn" />
                    </div>
                    <div class="mb-3">
                      <label class="label">Description</label>
                      <input class="form-control my-2 p-3" v-model="book.description" />
                    </div>
                    <div class="mb-3">
                      <label class="label">Publisher</label>
                      <input class="form-control my-2 p-3" v-model="book.publisher" />
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
  name: 'books',
  data () {
    return {
      books: [],
      newBook: [],
      error: '',
      editedBook: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/api/v1/books')
        .then(response => { this.books = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    addBook () {
      const value = this.newBook
      if (!value) {
        return
      }
      this.$http.secured.post('/api/v1/books/', { book: { title: this.newBook.title, author: this.newBook.author, description: this.newBook.description, isbn: this.newBook.isbn, publisher: this.newBook.publisher, is_available: this.newBook.is_available } })

        .then(response => {
          this.books.push(response.data)
          this.newBook = ''
        })
        .catch(error => this.setError(error, 'Cannot create book'))
    },
    removeBook (book) {
      this.$http.secured.delete(`/api/v1/books/${book.id}`)
        .then(response => {
          this.books.splice(this.books.indexOf(book), 1)
        })
        .catch(error => this.setError(error, 'Cannot delete book'))
    },
    editBook (book) {
      this.editedBook = book
    },
    updateBook (book) {
      this.editedBook = ''
      this.$http.secured.patch(`/api/v1/books/${book.id}`, { book: { title: book.title, author: book.author, description: book.description, isbn: book.isbn, publisher: book.publisher } })
        .catch(error => this.setError(error, 'Cannot update book'))
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
background: white;
border: 1px solid;
color: black;
}
</style>
