import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Books from '@/components/books/Books'
import Students from '@/components/students/Students'
import BorrowBooks from '@/components/books/BorrowBooks'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/books',
      name: 'Books',
      component: Books
    },
    {
      path: '/students',
      name: 'Students',
      component: Students
    },
    {
      path: '/borrow',
      name: 'BorrowBooks',
      component: BorrowBooks
    }
  ]
})
