const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/User');
const bcrypt        = require('bcrypt');
//{$inc:{tries:1}}
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, 
  (username, password, done) => {

    User.findOne({ username })
    .then(foundUser => {
      if (!foundUser) {
        done(null, false, { message: 'Incorrect username' });
        return;
      }
      
      if (foundUser.tries >= 3){
        var timeUnblock=(new Date(new Date(foundUser.updated_at).getTime() + 2 * 60000)).getMinutes()
        var timeRemaining=timeUnblock - new Date().getMinutes();
        if (timeRemaining<=0){
          foundUser.update({tries:0}).then()
        }else {
        done(null, false, { message: `${timeRemaining}` });
        return;}
      }
      
      if (!bcrypt.compareSync(password, foundUser.password)) {
        foundUser.update({$inc:{tries:1}}).then()
        done(null, false, { message: 'Incorrect password' });
        return;
      }
      foundUser.update({tries:0}).then()
      done(null, foundUser);
    })
    .catch(err => done(err));
  }
));
