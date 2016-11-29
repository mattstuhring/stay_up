'use strict';

exports.seed = function(knex) {
  return knex('products').del()
    .then(() => {
      return knex('products').insert([{
        id: 1,
        user_id: 1,
        brand: 'Off-White Black "Blue Collar" Hoodie',
        image: 'https://img.shopstyle-cdn.com/sim/31/82/31826660ad27cdc6790c85cc9f7a9ca1/off-white-black-blue-collar-hoodie.jpg',
        price: '$410',
        created_at: new Date('2016-11-28 14:26:16 UTC'),
        updated_at: new Date('2016-11-28 14:26:16 UTC')
      }, {
        id: 2,
        user_id: 1,
        brand: 'Moncler Ferrand Lightweight Two-Layer Down Blazer, Navy',
        image: 'https://img.shopstyle-cdn.com/sim/55/9c/559c15a927c6a17fe24be00c99d9afb2/moncler-ferrand-lightweight-two-layer-down-blazer-navy.jpg',
        price: '$1,195',
        created_at: new Date('2016-11-28 15:26:16 UTC'),
        updated_at: new Date('2016-11-28 15:26:16 UTC')
      }, {
        id: 3,
        user_id: 1,
        brand: 'Gucci Leather Horsebit slipper',
        image: 'https://img.shopstyle-cdn.com/sim/9b/df/9bdfb6f8486d645ad0e116b1ae4df413/gucci-leather-horsebit-slipper.jpg',
        price: '$595',
        created_at: new Date('2016-11-28 15:26:16 UTC'),
        updated_at: new Date('2016-11-28 15:26:16 UTC')
      }
    ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));"
      );
    });
};
