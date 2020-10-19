export class ServiceError extends Error {
    statusCode: number;
    code: string;
    details: any;

    constructor(statusCode: number, code: string, message: string, details: any = undefined) {
        {
            super(message);
            Object.setPrototypeOf(this, ServiceError.prototype);

            this.statusCode = statusCode;
            this.code = code;
            this.details = details;
        }
    }
}

export class AccountNotFoundError extends ServiceError {
    constructor(accountId: string) {
        super(404, 'AccountNotFoundError', `Account not found with id: ${accountId}`);
        Object.setPrototypeOf(this, AccountNotFoundError.prototype);
    }
}

export class InvalidAccountError extends ServiceError {
    constructor() {
        super(400, 'InvalidAccountError', 'Invalid account for the operation');
        Object.setPrototypeOf(this, InvalidAccountError.prototype);
    }
}

export class InvalidAmountError extends ServiceError {
    constructor() {
        super(400, 'InvalidAmountError', 'Invalid amount for the operation');
        Object.setPrototypeOf(this, InvalidAmountError.prototype);
    }
}
