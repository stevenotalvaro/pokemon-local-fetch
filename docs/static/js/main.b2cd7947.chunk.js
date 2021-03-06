;(this['webpackJsonppractice-pokemon-fetch-local'] =
  this['webpackJsonppractice-pokemon-fetch-local'] || []).push([
  [0],
  {
    13: function (e, n, t) {},
    15: function (e, n, t) {
      'use strict'
      t.r(n)
      var a = t(0),
        r = t.n(a),
        o = t(5),
        c = t.n(o),
        m = (t(13), t(1))
      t(4)
      function l(e) {
        var n = e.pokemonName,
          t = e.initialPokemonName,
          o = void 0 === t ? n || '' : t,
          c = e.onSubmit,
          l = r.a.useState(o),
          i = Object(m.a)(l, 2),
          u = i[0],
          s = i[1]
        function p(e) {
          s(e), c(e)
        }
        return (
          Object(a.useEffect)(
            function () {
              'string' === typeof n && s(n)
            },
            [n],
          ),
          r.a.createElement(
            'form',
            {
              onSubmit: function (e) {
                e.preventDefault(), c(u)
              },
              className: 'pokemon-form',
            },
            r.a.createElement(
              'label',
              {htmlFor: 'pokemonName-input'},
              'Pokemon Name',
            ),
            r.a.createElement(
              'small',
              null,
              'Try',
              ' ',
              r.a.createElement(
                'button',
                {
                  className: 'invisible-button',
                  type: 'button',
                  onClick: function () {
                    return p('pikachu')
                  },
                },
                '"pikachu"',
              ),
              ', ',
              r.a.createElement(
                'button',
                {
                  className: 'invisible-button',
                  type: 'button',
                  onClick: function () {
                    return p('charizard')
                  },
                },
                '"charizard"',
              ),
              ', or ',
              r.a.createElement(
                'button',
                {
                  className: 'invisible-button',
                  type: 'button',
                  onClick: function () {
                    return p('mew')
                  },
                },
                '"mew"',
              ),
            ),
            r.a.createElement(
              'div',
              null,
              r.a.createElement('input', {
                className: 'pokemonName-input',
                id: 'pokemonName-input',
                name: 'pokemonName',
                placeholder: 'Pokemon Name...',
                value: u,
                onChange: function (e) {
                  s(e.target.value)
                },
              }),
              r.a.createElement(
                'button',
                {type: 'submit', disabled: !u.length},
                'Submit',
              ),
            ),
          )
        )
      }
      var i = t(2),
        u = t.n(i),
        s = t(6),
        p = function (e) {
          return ''
            .concat(e.getHours(), ':')
            .concat(String(e.getMinutes()).padStart(2, '0'), ' ')
            .concat(String(e.getSeconds()).padStart(2, '0'), '.')
            .concat(String(e.getMilliseconds()).padStart(3, '0'))
        }
      function d(e) {
        var n = e.pokemon
        return r.a.createElement(
          'div',
          null,
          r.a.createElement(
            'div',
            {className: 'pokemon-info__img-wrapper'},
            r.a.createElement('img', {src: n.image, alt: n.name}),
          ),
          r.a.createElement(
            'section',
            null,
            r.a.createElement(
              'h2',
              null,
              n.name,
              r.a.createElement('sup', null, n.number),
            ),
          ),
          r.a.createElement(
            'section',
            null,
            r.a.createElement(
              'ul',
              null,
              n.attacks.special.map(function (e) {
                return r.a.createElement(
                  'li',
                  {key: e.name},
                  r.a.createElement('label', null, e.name),
                  ':',
                  ' ',
                  r.a.createElement(
                    'span',
                    null,
                    e.damage,
                    ' ',
                    r.a.createElement('small', null, '(', e.type, ')'),
                  ),
                )
              }),
            ),
          ),
          r.a.createElement(
            'small',
            {className: 'pokemon-info__fetch-time'},
            n.fetchedAt,
          ),
        )
      }
      function f(e) {
        var n = e.name,
          t = {
            name: Object(a.useRef)(n).current,
            number: 'XXX',
            image: './img/pokemon/fallback-pokemon.jpg',
            attacks: {
              special: [
                {name: 'Loading Attack 1', type: 'Type', damage: 'XX'},
                {name: 'Loading Attack 2', type: 'Type', damage: 'XX'},
              ],
            },
            fetchedAt: 'loading...',
          }
        return r.a.createElement(d, {pokemon: t})
      }
      function k(e) {
        var n = e.pokemonName,
          t = Object(a.useState)({
            status: n ? 'pending' : 'idle',
            pokemon: null,
            error: null,
          }),
          o = Object(m.a)(t, 2),
          c = o[0],
          l = o[1],
          i = c.pokemon,
          k = c.error,
          b = c.status
        return (
          Object(a.useEffect)(
            function () {
              n &&
                (l({status: 'pending'}),
                (function (e) {
                  var n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : 1500,
                    t =
                      '\n    query PokemonInfo($name: String) {\n      pokemon(name: $name) {\n        id\n        number\n        name\n        image\n        attacks {\n          special {\n            name\n            type\n            damage\n          }\n        }\n      }\n    }\n  '
                  return window
                    .fetch('https://graphql-pokemon2.vercel.app/', {
                      method: 'POST',
                      headers: {
                        'content-type': 'application/json;charset=UTF-8',
                        delay: n,
                      },
                      body: JSON.stringify({
                        query: t,
                        variables: {name: e.toLowerCase()},
                      }),
                    })
                    .then(
                      (function () {
                        var n = Object(s.a)(
                          u.a.mark(function n(t) {
                            var a, r, o, c, m
                            return u.a.wrap(function (n) {
                              for (;;)
                                switch ((n.prev = n.next)) {
                                  case 0:
                                    return (n.next = 2), t.json()
                                  case 2:
                                    if (((a = n.sent), (r = a.data), !t.ok)) {
                                      n.next = 14
                                      break
                                    }
                                    if (
                                      !(o =
                                        null === r || void 0 === r
                                          ? void 0
                                          : r.pokemon)
                                    ) {
                                      n.next = 11
                                      break
                                    }
                                    return (
                                      (o.fetchedAt = p(new Date())),
                                      n.abrupt('return', o)
                                    )
                                  case 11:
                                    return n.abrupt(
                                      'return',
                                      Promise.reject(
                                        new Error(
                                          'No pokemon with the name "'.concat(
                                            e,
                                            '"',
                                          ),
                                        ),
                                      ),
                                    )
                                  case 12:
                                    n.next = 16
                                    break
                                  case 14:
                                    return (
                                      (m = {
                                        message:
                                          null === r ||
                                          void 0 === r ||
                                          null === (c = r.errors) ||
                                          void 0 === c
                                            ? void 0
                                            : c
                                                .map(function (e) {
                                                  return e.message
                                                })
                                                .join('\n'),
                                      }),
                                      n.abrupt('return', Promise.reject(m))
                                    )
                                  case 16:
                                  case 'end':
                                    return n.stop()
                                }
                            }, n)
                          }),
                        )
                        return function (e) {
                          return n.apply(this, arguments)
                        }
                      })(),
                    )
                })(n).then(
                  function (e) {
                    l({status: 'resolved', pokemon: e})
                  },
                  function (e) {
                    l({status: 'rejected', error: e})
                  },
                ))
            },
            [n],
          ),
          'idle' === b
            ? 'Submit a pokemon'
            : 'pending' === b
            ? r.a.createElement(f, {name: n})
            : 'rejected' === b
            ? r.a.createElement(
                'div',
                {role: 'alert'},
                'There was an error:',
                ' ',
                r.a.createElement(
                  'pre',
                  {style: {whiteSpace: 'normal'}},
                  k.message,
                ),
              )
            : 'resolved' === b
            ? r.a.createElement(d, {pokemon: i})
            : void 0
        )
      }
      var b = t(7),
        E = function () {
          var e = Object(a.useState)(''),
            n = Object(m.a)(e, 2),
            t = n[0],
            o = n[1]
          return r.a.createElement(
            'div',
            {className: 'pokemon-info-app'},
            r.a.createElement(l, {
              pokemonName: t,
              onSubmit: function (e) {
                o(e)
              },
            }),
            r.a.createElement('hr', null),
            r.a.createElement(
              'div',
              {className: 'pokemon-info'},
              r.a.createElement(
                b.ErrorBoundary,
                {
                  onReset: function () {
                    o('')
                  },
                  resetKeys: [t],
                },
                r.a.createElement(k, {pokemonName: t}),
              ),
            ),
          )
        }
      c.a.render(r.a.createElement(E, null), document.getElementById('root'))
    },
    4: function (e, n, t) {},
    8: function (e, n, t) {
      e.exports = t(15)
    },
  },
  [[8, 1, 2]],
])
//# sourceMappingURL=main.b2cd7947.chunk.js.map
