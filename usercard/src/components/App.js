import '../App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			personData: [1, 2, 3],
			followersData: [1, 2, 3]
		};
	}

	componentDidMount() {
		axios
			.get('https://api.github.com/users/MichaelHabermas')
			.then(res => {
				this.setState({ personData: res.data });
				axios
					.get('https://api.github.com/users/MichaelHabermas/followers')
					.then(res => {
						console.log(res.data);
						this.setState({ followersData: res.data });
					})
					.catch(err => {
						console.log(err);
					});
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		return (
			<>
				<h1>{this.state.personData.name}</h1>
				<img src={`${this.state.personData.avatar_url}`} alt="Michael Habermas" />
				<h3>{this.state.personData.bio}</h3>
				<h3>{this.state.personData.location}</h3>
				<h2>Follower Count: {this.state.personData.followers}</h2>
				<h2>Followers:</h2>
				{this.state.followersData.map((follower, i) => {
					return <h4 key={i}>{follower.login}</h4>;
				})}
				<h2>Following: {this.state.personData.following}</h2>
				<h2>Public Repos: {this.state.personData.public_repos}</h2>
				<h2>Git Repo: {this.state.personData.html_url}</h2>
			</>
		);
	}
}

export default App;
