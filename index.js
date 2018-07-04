//Graphql-yoga is like express for graphql.  It takes in the required setup and then 
//routes requests to where they need to go
const {GraphQLServer} = require('graphql-yoga')


//Types are what makes graphql stand out over REST.  
//We need to define every piece of data we're going to use
const typeDefs = `
type Query {
    welcome: String!
    links: [Link!]!
}

type Mutation {
    addLink(url: String!, description: String!): Link!
}

type Link {
    id: ID!
    description: String!
    url: String!
    author: Author!
}

type Author {
    id: ID!
    name: String!
}
`

let currentId = 3
//This is just some dummy data.  In a real app we'd use a database instead
let articleLinks = [{
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'A resources to learn graphql. Check out the advanced sections for some more in-depth tutorials.'
    }, {
        id: 'link-1',
        url: 'news.ycombinator.com',
        description: 'Hacker news is like reddit that doesn\'t suck.  Focused on tech.  Great place to improvey our chameleon skills.'
    }, {
        id: 'link-2',
        url: 'https://www.graphqlhub.com/',
        description: 'Some practice APIs to play around with queries'
    }]
//This object needs to match the structure of our typeDefinition
//All values should be functions and what they return is like doing a res.send
const resolvers = {
    Query: {
        welcome: () => `Hacker News clone begins.`,
        links: () => articleLinks,
    },
    Mutation: {
        addLink: (root, args) => {
            const link = {
                id: `link-${currentId++}`,
                description: args.description,
                url: args.url
            }
            articleLinks.push(link)
            return link
        }
    },
    Link: {
        author: (parent) => author
    }
}

//Our server is looking for our typeDefs and our Resolvers
const server = new GraphQLServer({
    typeDefs,
    resolvers,
})

server.start(() => console.log(`Glistening on 4000`))