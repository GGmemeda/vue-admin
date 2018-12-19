module.exports = function (source, map) {
  this.callback(
    null,
    `export default function (Component) {
      Component.options.__showDocs = ${
      JSON.stringify(source)
      }
    }`,
    map
  )
}
