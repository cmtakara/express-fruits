const React = require("react");
const DefaultLayout = require('./layout/Default');

class Edit extends React.Component {
    render() {
        return (
            <DefaultLayout title="Edit Page">
        <form action={`/fruits/${this.props.fruit._id}?_method=PUT`} method="POST">
          Name: <input type="text" name="name" defaultValue={this.props.fruit.name} /><br />
          Color <input type="text" name="color" defaultValue={this.props.fruit.color} /><br />
          Is Ready To Eat:
          { this.props.fruit.readyToEat? <input type="checkbox" name="readyToEat" defaultChecked />: <input type="checkbox" name="readyToEat"/> } <br />
          <input type="submit" value={`Edit ${this.props.fruit.name}`} />
        </form>
            </DefaultLayout>
        )
    }
}

module.exports = Edit;
