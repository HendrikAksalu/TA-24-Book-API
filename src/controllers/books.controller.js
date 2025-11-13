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
    const idFromUrl = request.params?.id;

    const response = await prisma.book.findUnique({
        where: {
            id: Number(idFromUrl)
        }
    });
};

export const createBook = (request, response) => {};

export const updateBook = (request, response) => {};

export const deleteBook = (request, response) => {};