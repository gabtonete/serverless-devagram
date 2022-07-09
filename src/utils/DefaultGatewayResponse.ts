import { DefaultResponseMessage } from "../types/DefaultResponseMessage";

export type DefaultJsonResponse = {
    statusCode: number,
    headers: object,
    body: string
}

export const formatJSONResponse = (statusCode: number, message: string | null,
    response?: Record<string, unknown>): DefaultJsonResponse => {

    const responseMsg: DefaultResponseMessage = {};

    if (message && statusCode >= 200 && statusCode <= 300) {
        responseMsg.msg = message;
    } else if (message) {
        responseMsg.error = message;
    }
    return {
        headers: {
            "content-type": "application/json"
        },
        statusCode,
        body: JSON.stringify(response || responseMsg)
    }
}