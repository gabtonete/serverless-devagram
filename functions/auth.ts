import { APIGatewayEvent, Handler } from "aws-lambda";

export const register: Handler = async (event: APIGatewayEvent): Promise<any> => {
    return {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        statusCode: 200,
        body: JSON.stringify('Cadastro efetuado com sucesso'),
    };
};