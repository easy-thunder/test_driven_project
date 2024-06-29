
import { Model } from 'objection';

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],

      properties: {
        id: { type: 'integer' },
        username: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        user_name: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        image_url: { type: 'string' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
        // Define your properties here
      }
    };
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  // Define any relations here
}

export default User;
