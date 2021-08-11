export default Vue.component('test',{
    template: `
    <div id="test">
        <h1>{{greeting}}!!!</h1>
        <button @click=testJersey>Test jersey api</button>
        <button @click=testAxios>Test axios</button>
        <button @click="testPost">Test post</button>
        <div v-if="post">
            <h3>Post title: {{post.title}}</h3>
            <h4>Post content:</h4>
            <p>{{post.body}}</p>
        </div>
    </div> 
    `,
    data() { 
        return {
            user: {
                firstName: 'John',
                lastName: 'Doe' 
            },
            post: null,
            
        }
    },

    computed: {
        greeting() {
            return `Welcome ${this.user.firstName} ${this.user.lastName}`;
        }
    },

    methods: {
        async testAxios() {
            this.post = (await axios.get('https://jsonplaceholder.typicode.com/posts/1')).data;
        },

        async testJersey() {
            this.user = (await axios.get('http://localhost:8080/FoodWebShop/rest/test')).data; 
        },

        async testPost() {
            this.user = (await axios.post('http://localhost:8080/FoodWebShop/rest/test',
                        { firstName: 'Test', lastName:'Testic' })).data;
        }
    }
})