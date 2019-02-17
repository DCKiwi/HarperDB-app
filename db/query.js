const createSchema = (schema) => JSON.stringify({ operation: 'create_schema', schema });

const createTable = (schema, table) => JSON.stringify({ operation: 'create_table', schema, table, hash_attribute: 'id' });

const describeAll = () => JSON.stringify({ operation: 'describe_all' });

const describeSchema = (schema) => JSON.stringify({ operation: 'describe_schema', schema });

const describeTable = (table, schema) => JSON.stringify({ operation: 'describe_table', table, schema });

const insert = (schema, table, keyValue) => JSON.stringify({ operation: 'insert', schema, table, records: keyValue })


module.exports = {
  createSchema,
  describeAll,
  createTable,
  insert,
  describeSchema,
  describeTable,
};
