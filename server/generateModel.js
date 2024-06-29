import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const modelName = args[0];
const attributes = args.slice(1);

if (!modelName) {
  console.error('Please provide a model name');
  process.exit(1);
}

const attributeDefinitions = attributes.map(attr => {
  const [name, type] = attr.split(':');
  return `        ${name}: { type: '${type}' }`;
}).join(',\n');

const modelTemplate = (name, attributes) => `
import { Model } from 'objection';

class ${name} extends Model {
  static get tableName() {
    return '${name.toLowerCase()}s';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],

      properties: {
        id: { type: 'integer' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
${attributes}
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

export default ${name};
`;

const modelDir = path.join(__dirname, 'src', 'models');
if (!fs.existsSync(modelDir)) {
  fs.mkdirSync(modelDir, { recursive: true });
}

const modelPath = path.join(modelDir, `${modelName}.js`);
fs.writeFileSync(modelPath, modelTemplate(modelName, attributeDefinitions), 'utf8');

console.log(`Model ${modelName} created at ${modelPath}`);

function addDefaultColumns(table) {
  table.increments('id').primary();
  table.timestamps(true, true);
}

export { addDefaultColumns };