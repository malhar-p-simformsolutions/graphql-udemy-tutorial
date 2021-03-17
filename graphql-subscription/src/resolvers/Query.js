const  Query = {
    comments(parent, args, { db }, info) {
        if(!args.query) {
            return db.comments
        }
    },
    users(parent, args, { db }, info) {
        if(!args.query) {
            return db.users
        }
        
        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
        
    },

    posts(parent, args, { db }, info) {
        if(!args.query) {
            return db.posts
        }

        return db.posts.filter((post) => {
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
}

export { Query as default }