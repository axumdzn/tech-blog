const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

Blog.belongsTo(User,{
    foreignKey: 'user_id',
});

User.hasMany(Blog,{
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});


User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
})

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
})

Comment.belongsTo(User, {
    foreignKey:'user_id'
});


module.exports = {User, Blog, Comment}