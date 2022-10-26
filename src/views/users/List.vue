<script setup>
import { storeToRefs } from 'pinia';

import { useBooksStore } from '@/stores';

const booksStore = useBooksStore();
const { books } = storeToRefs(booksStore);

booksStore.getAll();
</script>

<template>
    <h1>Book</h1>
    
    <div class="row">
        <div class="col-6">
            <router-link to="/users/add" class="btn btn-sm btn-success mb-2">Add User</router-link>
        </div>
        <div class="col-6">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Your Email">
                <div class="input-group-append">
                    <span class="input-group-text"></span>
                </div>
            </div>
        </div>
    </div>
    
    <table class="table table-striped">
        <thead>
            <tr>
                <th style="width: 10%">No</th>
                <th style="width: 15%">Judul</th>
                <th style="width: 10%">ISBN</th>
                <th style="width: 30%">Penerbit</th>
                <th style="width: 40%">Deskripsi</th>
                <th style="width: 10%">Aksi</th>
            </tr>
        </thead>
        <tbody>
            <template v-if="books.length">
                <tr v-for="book in books" :key="book.id">
                    <td>{{ book.judul }}</td>
                    <td>{{ book.isbn }}</td>
                    <td>{{ book.penerbit }}</td>
                    <td>{{ book.deskripsi }}</td>
                    <td style="white-space: nowrap">
                        <router-link :to="`/books/edit/${user.id}`" class="btn btn-sm btn-primary mr-1">Edit</router-link>
                        <button @click="usersStore.delete(user.id)" class="btn btn-sm btn-danger btn-delete-user" :disabled="user.isDeleting">
                            <span v-if="user.isDeleting" class="spinner-border spinner-border-sm"></span>
                            <span v-else>Delete</span>
                        </button>
                    </td>
                </tr>
            </template>
            <tr v-if="books.loading">
                <td colspan="4" class="text-center">
                    <span class="spinner-border spinner-border-lg align-center"></span>
                </td>
            </tr>
            <tr v-if="books.error">
                <td colspan="4">
                    <div class="text-danger">Error loading books: {{books.error}}</div>
                </td>
            </tr>            
        </tbody>
    </table>
</template>
