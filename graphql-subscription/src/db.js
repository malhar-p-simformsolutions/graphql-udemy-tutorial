const users = [{
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

const posts = [{
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

const comments = [{
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

const db = {
    users,
    posts,
    comments
}

export { db as default}