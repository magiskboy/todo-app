export class Task {
    constructor(
        public id?: number,
        public title?: string,
        public status?: string,
        public description?: string,
        public updated_at?: Date,
        public created_at?: Date,
    ) {}

    static create(data: any): Task {
        if (typeof data['created_at'] === 'string') {
            data['created_at'] = new Date(data['created_at']);
        }
        if (typeof data['updated_at'] === 'string') {
            data['updated_at'] = new Date(data['updated_at']);
        }
        return new Task(data['id'], data['title'], data['status'], data['description'], data['updated_at'], data['created_at']);
    }
}