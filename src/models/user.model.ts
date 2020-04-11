export class User {
    constructor(
        public id?: number,
        public username?: string,
        public fullname?: string,
        public createdAt?: Date,
    ) {}

    static create(data: any): User {
        return new User(
            data['id'],
            data['fullname'],
            data['username'],
            data['created_at']
        );
    }
}