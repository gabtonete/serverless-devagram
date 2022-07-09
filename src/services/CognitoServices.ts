import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";

export class CognitoServices {
    constructor(
        private userPoolId: string,
        private clientId: string,
    ) { }

    private poolData = {
        UserPoolId: this.userPoolId,
        ClientId: this.clientId,
    };

    public signUp = (email: string, password: string): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            try {
                const userPool = new CognitoUserPool(this.poolData);
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

    public confirmEmail = (email: string, code: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            try {
                const userPool = new CognitoUserPool(this.poolData);

                const userData = {
                    Username: email,
                    Pool: userPool,
                };

                const user = new CognitoUser(userData);

                user.confirmRegistration(code, true,
                    (err, result) => {
                        if (err) {
                            reject(err.message);
                        }

                        resolve(result);
                    }
                );
            } catch (err) {
                reject(err)
            }
        })
    }
}