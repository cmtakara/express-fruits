const React = require("react");
const DefaultLayout = require("./layout/Default")

class Show extends React.Component {
  render() {
    const { name, color, readyToEat } = this.props.fruit
    return (
      <DefaultLayout title={`${name} show page`}>
        <nav>
          <a href="/fruits">Home Page</a>
        </nav>

        <div>
          <p>The {name} is {color}.</p>
          {readyToEat ? "It is ready to eat!" : "It is not ready to eat... dont touch that"}
        </div>
      </DefaultLayout>
    )
  }
}
// We can write javascript code within the curly brackets

module.exports = Show