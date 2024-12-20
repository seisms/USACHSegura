import {useState, useEffect} from 'react';

function App() {
	const [users, setUsers] = useState(false);

	function getUsers(){
		fetch("http://localhost:3001")
			.then(response => {
				return response.text();
			})
			.then(data => {
				setUsers(data);
			})
	}

	useEffect(() => {
		getUsers();
	}, [])
	return (
		<div>
			<button>
			{users ? users : "There are no users"}
			</button>
		</div>
	)
}
export default App;
