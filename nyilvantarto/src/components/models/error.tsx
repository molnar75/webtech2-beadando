export interface Error {
    author : {
        penName: boolean
        realName: boolean
        birthYear: boolean
    }
    publisher: {
        name: boolean
        address: boolean
        fundationYear: boolean
    }
    book: {
        title: boolean
        pageNumber: boolean
        publicationYear: boolean
        publisher: boolean
        author: boolean
    }
}