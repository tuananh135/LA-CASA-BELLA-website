// dbPassword = 'mongodb+srv://YOUR_USERNAME_HERE:'+ encodeURIComponent('YOUR_PASSWORD_HERE') + '@CLUSTER_NAME_HERE.mongodb.net/test?retryWrites=true';
dbPassword = 'mongodb://localhost:27017/lacasabella?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false'

module.exports = {
    mongoURI: dbPassword
};
