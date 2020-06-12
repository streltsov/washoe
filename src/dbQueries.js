const {pool, client} = require('./db');
const { Pool, Client } = require('pg')

exports.updateStage = word => 
  pool.query('UPDATE words SET stage = $1, timestamp = $2 WHERE email = $3 AND word_id = $4', [word.stage + 1, new Date( Date.now() + word.notifyIn), word.email, word.word_id]).then(res => res.rows[0]);

exports.resetStage = word => 
  pool.query('UPDATE words SET stage = 0, timestamp = $1 WHERE email = $2 AND word_id = $3', [new Date( Date.now() + 12e4), word.email, word.word_id]).then(res => res.rows[0]);

exports.getScheduledWord = email =>
  pool.query('SELECT * FROM words WHERE email = $1 AND timestamp < current_timestamp ORDER BY timestamp LIMIT 1', [email]).then(res => res.rows);

exports.fetchUser = email =>
  pool.query('SELECT * FROM users WHERE email = $1', [email]).then(res => res.rows[0]);

exports.addWord = cb => wordData => {
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
      const queryText = 'INSERT INTO words(word, meaning, example, email, stage, timestamp) VALUES($1, $2, $3, $4, $5, $6) RETURNING word, meaning'
      client.query(queryText, [wordData.word, wordData.meaning, wordData.example, wordData.email, 0, new Date( Date.now() + wordData.notifyIn)], (err, res) => {
        if (shouldAbort(err)){
          console.log('Error: ', err);
          return;
        }
        client.query('COMMIT', err => {
          if (err) console.error('Error committing transaction', err.stack);
          done()
        })
        cb(res);
      })
    })
  })
}

exports.createUser = cb => userData => {
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
        client.query('COMMIT', err => {
          if (err) console.error('Error committing transaction', err.stack);
          done()
        })
        cb(res);
      })
    })
  })
}
