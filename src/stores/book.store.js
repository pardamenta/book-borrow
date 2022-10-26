import { defineStore } from 'pinia';
import axios from 'axios';
import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useBooksStore = defineStore({
    id: 'books',
    state: () => ({
        books: {},
        book: {}
    }),
    actions: {
        async getAll() {
            this.books = { loading: true };
            try {
                let data = await axios.get("http://159.223.57.121:8080/books?limit=10&offset=0")
                this.books = data.data;
            } catch (error) {
                this.books = { error };
            }
        },
        async getById(id) {
            this.book = { loading: true };
            try {
              let data = await axios.get(`http://159.223.57.121:8080/books/${id}`)
                this.book = await fetchWrapper.get(`${baseUrl}/${id}`);
            } catch (error) {
                this.book = { error };
            }
        },
        async update(id, params) {
            await fetchWrapper.put(`${baseUrl}/${id}`, params);

            // update stored book if the logged in book updated their own record
            const authStore = useAuthStore();
            if (id === authStore.book.id) {
                // update local storage
                const book = { ...authStore.book, ...params };
                localStorage.setItem('book', JSON.stringify(book));

                // update auth book in pinia state
                authStore.book = book;
            }
        },
        async delete(id) {
            // add isDeleting prop to book being deleted
            this.books.find(x => x.id === id).isDeleting = true;

            await fetchWrapper.delete(`${baseUrl}/${id}`);

            // remove book from list after deleted
            this.books = this.books.filter(x => x.id !== id);

            // auto logout if the logged in book deleted their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                authStore.logout();
            }
        }
    }
});
