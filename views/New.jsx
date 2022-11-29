const React = require("react")
const DefaultLayout = require("./layout/Default")

class New extends React.Component {
  render() {
    return (
      <DefaultLayout title="Create a New Fruit">
        <nav>
          <a href="/fruits">Home Page</a>
        </nav>
            {/* NOTE: action will be the route, method will be the HTTP verb */}
        <form action="/fruits" method="POST">
          Name: <input type="text" name="name" /><br />
          Color: <input type="text" name="color" /><br />
          Is Ready To Eat: <input type="checkbox" name="readyToEat"/><br />
          <input type="submit" value="Create Fruit" />
        </form>
      </DefaultLayout>
    )
  }
}

module.exports = New