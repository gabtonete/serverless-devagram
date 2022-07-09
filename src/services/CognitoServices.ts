import { CognitoUserPool } from "amazon-cognito-identity-js";

export class CognitoServices {
    constructor(
        private userPoolId: string,
        private clientId: string,
    ) { }

    public signUp = (email: string, password: string): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            try {
                const poolData = {
                    UserPoolId: this.userPoolId,
                    ClientId: this.clientId,
                };

                const userPool = new CognitoUserPool(poolData);
                const attributeList = [];
                userPool.signUp(
                    email, password, attributeList, attributeList,
                    (err, result) => {
                        if (err) {
                            reject(err.message);
                        }

                        resolve(result);
                    },
                );
            } catch (err) {
                reject(err);
            }
        });
    }
}