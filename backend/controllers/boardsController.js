export const createBoard = async (req, res, next) => {
    try {
        const { title, description, is_public } = req.body;
        const userId = req.session.userId; 
    }
};