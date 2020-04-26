const {pool} = require('./db');

exports.createUser = cb => userData =>
  pool.connect((err, client, done) => {

    const shouldAbort = err => {
      if (err) {
        console.error('Error in transaction', err.stack)
        client.query('ROLLBACK', err => {
          if (err) console.error('Error rolling back client', err.stack)
          done()
        })
      }
      return !!err
    }
    client.query('BEGIN', err => {
      if (shouldAbort(err)) return
      const queryText = 'INSERT INTO users(email, password, created_on) VALUES($1, $2, $3) RETURNING email, password, created_on'
      client.query(queryText, [userData.email, userData.password, new Date()], (err, res) => {
        if (shouldAbort(err)){
          console.log('Error: ', err);
          return;
        }
        cb(res);
      })
    })
  })
