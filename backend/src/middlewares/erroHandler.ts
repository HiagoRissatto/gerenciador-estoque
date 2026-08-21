import type {Request,Response,NextFunction} from "express"

export function errorHandler(err:Error,req:Request,res:Response,next:NextFunction) {
    console.error(err);

    if(err.message === "Produto não encontrado") {
        return res.status(404).json({
            message: err.message
        });
    }
    if(err.message === "Usuário não encontrado"|| err.message === "Senha incorreta") {
        return res.status(404).json({
            message: "Email ou senha incorretos"
        });
    }
    if(err.message === "Quantidade insuficiente em estoque") {
        return res.status(400).json({
            message: err.message
        });
    }
    return res.status(500).json({
        message: "Erro interno do servidor"
    })};
