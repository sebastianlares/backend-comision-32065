const normalizr = require('normalizr');
const schema = normalizr.schema;

const userSchema = new schema.Entity('user');
const messageSchema = new schema.Entity('message', {
  author: userSchema,
});
const messagesListSchema = new schema.Entity('messagesList', {
  messages: [messageSchema],
});

module.exports = { messagesListSchema, messageSchema };
