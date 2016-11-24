'use strict';

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        id: 1,
        username: 'matt',
        hashed_password: '$2a$12$B7ScCdFD20ShFtT/YbqG3evjDWp8DWuapqP1UKRIWndKws6KGQpta',
        created_at: new Date('2016-11-24 14:26:16 UTC'),
        updated_at: new Date('2016-11-24 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
