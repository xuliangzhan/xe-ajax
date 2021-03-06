const XEAjax = require('../index')

describe('Ajax functions', () => {
  test('serialize()', () => {
    expect(
      XEAjax.serialize({ name: 'test1' })
    ).toEqual('name=test1')
    expect(
      XEAjax.serialize({ name: 'test1', value: null })
    ).toEqual('name=test1&value=')
    expect(XEAjax.serialize({ name: 'test1', value: undefined })).toEqual('name=test1')
  })
})
