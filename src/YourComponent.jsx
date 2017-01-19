import React from 'react';

class SimpleForm extends React.Component {

	constructor (props) {
		super(props);
		this._modify_children = this._modify_children.bind(this);
		this.submit = this.submit.bind(this);
	}

	submit () {
		this.props.onSubmit(this.state);
	}

	// update state input value

	_update_value (n, v) {
		let state = {};
		state[n] = v;
		this.setState({
			...this.state,
			...state
		})
		this.props.onChange(n, v);
	}

	_modify_children (c) {

		if (!(c instanceof Array)) {
			c = [c]; // convert to array so we can iterate over it
		}

		return c.map((ch, i) => {

			if(typeof ch === 'string') {
				return ch;
			}

			if(ch.type == 'button') {
				return React.cloneElement(ch, { onClick: this.submit })
			}

			if (ch.type == 'select' || ch.type == 'input' || ch.type == 'textarea') {
				return React.cloneElement(ch, {onChange: (e) => {
					this._update_value(ch.props.name, e.target.value)
				}});
			}

			let new_child_children = false;

			let new_element = {key: index};

			if(ch.props && ch.props.children) {
				new_child_children = this._modify_children(ch.props.children)
				new_element.children = new_child_children;
			}

			return React.cloneElement(ch, {...new_element});

		}, this)
	}

	render () {
		let x = this._modify_children(this.props.children)
		return (
			<div>
				{x}
			</div>
		)
	}

}


export default class YourComponent extends React.Component {

	_onSubmit (values) {
		console.log(values);
	}

	_onChange (f, v) {
		console.log(f , v)
	}

	render () {
		return (
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<SimpleForm onSubmit={this._onSubmit.bind(this)} onChange={this._onChange.bind(this)}>
							<div className="form-group">
								<label> Name </label>
								<input type="text" name="name" placeholder="Name" className="form-control" />
							</div>
							<div className="form-group">
								<label> Email </label>
								<input type="email" name="email" placeholder="Email" className="form-control" />
							</div>
							<div className="form-group">
								<label> Password </label>
								<input type="password" name="password" placeholder="Password" className="form-control" />
							</div>
							<div className="form-group">
								<button className="btn btn-success" type="submit">Submit</button>
							</div>
						</SimpleForm>
					</div>
				</div>
			</div>
		)
	}
}