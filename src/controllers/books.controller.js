import prisma from "../config/prisma.js";

export const getAllBooks = async (request, response) => {
    
    try {
        const books = await prisma.book.findMany();
        response.json({ 
            message: "All books",
            data: books
            })

    } catch (exception) {
        console.log(exception);
        response.status(500).json({ 
            message: "Something went wrong",
            error: exception.message
        })
    }
    
    
};

export const getBookById = async (request, response) => {

try {
    const idFromUrl = request.params?.id;

    const book = await prisma.book.findUnique({
        where: {
            id: Number(idFromUrl)
        }
    });

    if (!book) {
        response.status(404).json({
            message: 'Not found'
        });
    }

    response.status(200).json({
        message: 'Successfully Found book',
        data: book
    });
} catch (exception) {
    console.log(exception);
    response.status(500).json({
        message: 'Something went wrong',
        error: exception.message
    });
    
}
};

export const createBook = (request, response) => {};

export const updateBook = (request, response) => {};

export const deleteBook = (request, response) => {};