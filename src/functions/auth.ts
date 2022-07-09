import { APIGatewayEvent, Handler } from "aws-lambda";
import { emailRegex, passwordRegex } from "../constants/Regexes";
import { CognitoServices } from "../services/CognitoServices";
import { UserRegisterRequest } from "../types/UserRegisterRequest";
import { DefaultJsonResponse, formatJSONResponse } from "../utils/DefaultGatewayResponse";

export const register: Handler = async (event: APIGatewayEvent): Promise<DefaultJsonResponse> => {
    try {
        const { USER_POOL_ID, USER_CLIENT_ID } = process.env;
        if (!USER_POOL_ID || !USER_CLIENT_ID) {
            return formatJSONResponse(500, 'Cognito Environments não encontradas');
        }

        if (!event.body) {
            return formatJSONResponse(400, 'Parâmetros de entrada nãoinformados');
        }

        const request = JSON.parse(event.body) as UserRegisterRequest;
        const { email, password, name } = request;

        if (!email || !email.match(emailRegex)) {
            return formatJSONResponse(400, 'Email inválido');
        }

        if (!password || !password.match(passwordRegex)) {
            return formatJSONResponse(
                400,
                'Senha inválida, senha deve conter pelo menos um caractér' +
                ' maiúsculo, minúsculo, numérico e especial, além de ter pelo menos oito dígitos.');
        }

        if (!name || name.trim().length < 2) {
            return formatJSONResponse(400, 'Nome inválido');
        }

        await new CognitoServices(USER_POOL_ID, USER_CLIENT_ID).signUp(email, password);
        
        return formatJSONResponse(200, 'Usuario cadastrado com sucesso, verifique seu email para confirmar o codigo!');
    } catch (e: any) {
        console.log('Error on register user: ', e);
        return formatJSONResponse(500, 'Erro ao cadastrar usuário: ' + e);
    }
};