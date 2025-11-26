import prisma from '../config/prisma.js';

export const getAllAuthors = async (request, response) => {
  try {
    // Default query params
    const {
      sort = "id",             // default sort field
      sort_direction = "asc",  // default sort direction
      take = 10,               // default page size
      page = 1                 // default page number
    } = request.query;

    const takeNumber = Number(take) || 10;
    const pageNumber = Number(page) || 1;
    const skip = takeNumber * (pageNumber - 1);

    const authors = await prisma.author.findMany({
      orderBy: {
        [sort]: sort_direction
      },
      skip,
      take: takeNumber
    });

    response.json({
      message: 'All authors',
      data: authors
    });
  } catch (exception) {
    console.error(exception);
    response.status(500).json({
      message: "Something went wrong",
      error: exception.message
    });
  }
};

export const getAuthorById = async (request, response) => {
  try {
    const idFromURL = Number(request.params?.id);

    if (isNaN(idFromURL)) {
      return response.status(400).json({ message: "Invalid author ID" });
    }

    const author = await prisma.author.findUnique({
      where: { id: idFromURL }
    });

    if (!author) {
      return response.status(404).json({ message: 'Not Found' });
    }

    response.status(200).json({
      message: 'Successfully Found Author',
      data: author
    });
  } catch (exception) {
    response.status(500).json({
      message: 'Something went wrong',
      error: exception.message
    });
  }
};

export const createAuthor = async (request, response) => {
  try {
    const { name, bio, avatar_url, birth_year } = request.body;

    const newAuthor = await prisma.author.create({
      data: {
        name,
        bio,
        avatar_url,
        birth_year: Number(birth_year)
      }
    });

    response.status(201).json({
      message: 'Successfully Created Author',
      data: newAuthor
    });
  } catch (exception) {
    response.status(500).json({
      message: 'Something went wrong',
      error: exception.message
    });
  }
};

export const updateAuthor = async (request, response) => {
  try {
    const { id } = request.params;
    const { name, bio, avatar_url, birth_year } = request.body;

    const updatedAuthor = await prisma.author.update({
      where: { id: Number(id) },
      data: {
        name,
        bio,
        avatar_url,
        birth_year: Number(birth_year)
      }
    });

    response.status(200).json({
      message: 'Successfully Updated Author',
      data: updatedAuthor
    });
  } catch (exception) {
    console.error(exception);
    response.status(500).json({
      message: 'Something went wrong',
      error: exception.message
    });
  }
};

export const deleteAuthor = async (request, response) => {
  try {
    const authorId = Number(request.params?.id);

    if (isNaN(authorId)) {
      return response.status(400).json({ message: "Invalid author ID" });
    }

    await prisma.author.delete({ where: { id: authorId } });

    response.status(200).json({
      message: 'Successfully Deleted'
    });
  } catch (exception) {
    console.error(exception);
    response.status(500).json({
      message: 'Something went wrong',
      error: exception.message
    });
  }
};
