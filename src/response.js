/*
 * Public: Responses are sent to matching listeners. Messages know about the
 * content and user that made the original message, and how to reply back to
 * them.
 *
 * robot   - A Robot instance.
 * message - A Message instance.
 * match   - A Match object from the successful Regex match.
 */
function Response(robot, message, match) {
  this.robot = robot;
  this.message = message;
  this.match = match;
  this.envelope = {
    room: this.message.room,
    user: this.message.user,
    message: this.message
  };
}

/*
 * Public: Posts a message back to the chat source
 *
 * strings - One or more strings to be posted. The order of these strings
 *           should be kept intact.
 *
 * Returns nothing.
 */
Response.prototype.send = function(/* *strings */) {
  var strings = 1 <= arguments.length ? Array.prototype.slice.call(arguments) : [];
  return this.robot.adapter.send.apply(this.robot.adapter, [this.envelope].concat(Array.prototype.slice.call(strings)));
};

/*
 * Public: Posts an emote back to the chat source
 *
 * strings - One or more strings to be posted. The order of these strings
 *           should be kept intact.
 *
 * Returns nothing.
 */
Response.prototype.emote = function() {
  var strings = 1 <= arguments.length ? Array.prototype.slice.call(arguments) : [];
  return this.robot.adapter.emote.apply(this.robot.adapter, [this.envelope].concat(Array.prototype.slice.call(strings)));
};

/*
 * Public: Posts a message mentioning the current user.
 *
 * strings - One or more strings to be posted. The order of these strings
 *           should be kept intact.
 *
 * Returns nothing.
 */
Response.prototype.reply = function() {
  var strings = 1 <= arguments.length ? Array.prototype.slice.call(arguments) : [];
  return this.robot.adapter.reply.apply(this.robot.adapter, [this.envelope].concat(Array.prototype.slice.call(strings)));
};

/*
 * Public: Posts a topic changing message
 *
 * strings - One or more strings to set as the topic of the
 *           room the bot is in.
 *
 * Returns nothing.
 */
Response.prototype.topic = function() {
  var strings = 1 <= arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
  return this.robot.adapter.topic.apply(this.robot.adapter, [this.envelope].concat(Array.prototype.slice.call(strings)));
};

/*
 * Public: Play a sound in the chat source
 *
 * strings - One or more strings to be posted as sounds to play. The order of
 *           these strings should be kept intact.
 *
 * Returns nothing
 */
Response.prototype.play = function() {
  var strings = 1 <= arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
  return this.robot.adapter.play.apply(this.robot.adapter, [this.envelope].concat(Array.prototype.slice.call(strings)));
};

/*
 * Public: Posts a message in an unlogged room
 *
 * strings - One or more strings to be posted. The order of these strings
 *           should be kept intact.
 *
 * Returns nothing
 */
Response.prototype.locked = function() {
  var strings = 1 <= arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
  return this.robot.adapter.locked.apply(this.robot.adapter, [this.envelope].concat(Array.prototype.slice.call(strings)));
};

/*
 * Public: Picks a random item from the given items.
 *
 * items - An Array of items.
 *
 * Returns a random item.
 */
Response.prototype.random = function(items) {
  return items[Math.floor(Math.random() * items.length)];
};

/*
 * Public: Tell the message to stop dispatching to listeners
 *
 * Returns nothing.
 */
Response.prototype.finish = function() {
  return this.message.finish();
};

/*
 * Public: Creates a scoped http client with chainable methods for
 * modifying the request. This doesn't actually make a request though.
 * Once your request is assembled, you can call `get()`/`post()`/etc to
 * send the request.
 *
 * Returns a ScopedClient instance.
 */
Response.prototype.http = function(url) {
  return this.robot.http(url);
};

module.exports = Response;
