import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

/*const typeDefs = `
    type Query {
      id: ID!
      name: String!
      age: Int!
      employee: Boolean!
      gpa: Flaot
    }
`

const resolvers = {
    Query :{
        id() {
            return 'alpha9'
        },
        name() {
            return 'Malhar'
        },
        age() {
            return 27
        },
        employed() {
            return true
        },
        gpa() {
            return 9.36
        }
    }
}*/

let users = [{
    id: '1',
    name: 'Bruce',
    email: 'wayne@enterprise.com',
    age: 34
}, {
    id: '2',
    name: 'Rachel',
    email: 'rachel@batman.com',
    age: 32
}, {
    id: '3',
    name: 'Harvey',
    email: 'twoface@dent.com'
}]

let posts = [{
    id: '10',
    title: 'Batman Begins',
    body: 'Making of the Batman',
    published: true,
    author: '1'
}, {
    id: '20',
    title: 'The Dark Knight',
    body: 'Batman faces Joker in this epic',
    published: true,
    author: '1'
}, {
    id: '30',
    title: 'The Dark Knight Rises',
    body: 'Batman saves Gotham from extinction',
    published: true,
    author: '3'
}]

let comments = [{
    id: '11',
    text: 'This movie is marvelous.',
    post: '10',
    author: '1'
}, {
    id: '12',
    text: 'The best Superhero movie of all time.',
    post: '20',
    author: '2'
}, {
    id: '13',
    text: 'Wish I could be a Hero like Batman is.',
    post: '30',
    author: '3'
}, {
    id: '14',
    text: 'Nolan nailed the direction with utmost perfection.',
    post: '30',
    author: '2'
}]

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments(query: String): [Comment!]!
        me: User!
        post: Post!
    }

    type Mutation {
        createUser(data: CreateUserInput): User!
        deleteUser(id: ID!): User!
        createPost(data: CreatePostInput): Post!
        deletePost(id: ID!): Post!
        createComment(data: CreateCommentInput): Comment!
    }

    input CreateUserInput {
        name: String!
        email: String!
        age: Int
    }

    input CreatePostInput {
        title: String!
        body: String!
        published: Boolean!
        author: ID!
    }

    input CreateCommentInput {
        text: String!
        author: ID!
        post: ID!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]! 
    }

    type Comment {
        id: ID!
        text: String!
        post: Post!
        author: User!
    }
`

const resolvers = {
    Query: {
        comments(parent, args, ctx, info) {
            if(!args.query) {
                return comments
            }
        },
        users(parent, args, ctx, info) {
            if(!args.query) {
                return users
            }
            
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
            
        },

        posts(parent, args, ctx, info) {
            if(!args.query) {
                return posts
            }

            return posts.filter((post) => {
                return (post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase()))
            })
        },
        me() {
            return {
                id: '1234',
                name: 'Malhar',
                email: 'malhar@gmail.com',
                age: 21
            }
        },

        post() {
            return {
                id: '1',
                title: 'Darth Vader',
                body: '',
                published: false
            }
        }
    },

    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => {
                return user.email === args.data.email
            })

            if (emailTaken) {
                throw new Error('Email Taken.')
            }




            const user = {
                id: uuidv4(),
                /*name: args.name,
                email: args.email,
                age: args.age*/
                ...args.data
            }

            users.push(user)
           // console.log(user)
            return user
        },

        deleteUser(parent, args, ctx, info) {
            const userIndex = users.findIndex((user) => {
                return user.id === args.id
            })
            if(userIndex === -1) {
                throw new Error('User not found')
            }

            const deletedUsers = users.splice(userIndex, 1)

            posts = posts.filter((post) => {
                const match = post.author === args.id
                if(match){
                    comments = comments.filter((comment) => {
                        return comment.post !== post.id
                    })
                }
                return !match
            })
            comments = comments.filter((comment) => {
                return comment.author !== args.id
            })
            return deletedUsers[0]
        },

        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.data.author)

            if (!userExists) {
                throw new Error('User not found')
            }

            const post = {
                id: uuidv4(),
                /*title: args.title,
                body: args.body,
                published: args.published,
                author: args.author*/
                ...args.data
            }

            posts.push(post)
            console.log(post)
            return post
        },

        deletePost(parent, args, ctx, info) {
            const postIndex = posts.findIndex((post) => {
                return post.id === args.id
            })

            if(postIndex === -1) {
                throw new Error('Post not found')
            }

            const deletedPost = posts.splice(postIndex, 1)
            comments = comments.filter((comment) => {
                return comment.post !== args.id
            })

            return deletedPost[0]
        },

        createComment(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.data.author)

            if (!userExists) {
                throw new Error('User not found')
            }

            const postExists = posts.some((post) => {
                return post.id === args.data.post && post.published === true
            })

            if (!postExists) {
                throw new Error('Post not found')
            }

            const comment = {
                id: uuidv4(),
                /*text: args.text,
                author: args.author,
                post: args.post*/
                ...args.data
            }

            comments.push(comment)
            
            return comment

        }
    },

    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },

    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post
            }) 
        }
    }
}

const server = new GraphQLServer ({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!');
})