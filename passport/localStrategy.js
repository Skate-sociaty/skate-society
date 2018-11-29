const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');
const transporter=require('../mail/transporter');


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

        if (foundUser.tries >= 3) {
          var timeUnblock = (new Date(new Date(foundUser.updated_at).getTime() + 2 * 60000))
          var timeRemaining = timeUnblock < new Date();
          console.log(timeRemaining)
          if (timeRemaining) {
            foundUser.update({ tries: 0 }).then()
          } else {

            transporter.sendMail({
              from: 'Miguel <migueliron166@gmail.com>',
              to: 'migueliron166@gmail.com',
              subject: 'Three failed tries to enter in your account ',
              text: 'Confirmation message',
              html: `<h1>Warning!</h1>
              <p> Somebody has tried to enter in your account. We have blocked for 10 minutes your account due to security.</p>`
            }
            )
            done(null, false, { message: `Blocked for 10 minutes due to security` })
            return;
          }
        }

        if (!bcrypt.compareSync(password, foundUser.password)) {
          foundUser.update({ $inc: { tries: 1 } }).then()
          done(null, false, { message: 'Incorrect password' });
          return;
        }
        foundUser.update({ tries: 0 }).then()
        done(null, foundUser);
      })
      .catch(err => done(err));
  }
));
