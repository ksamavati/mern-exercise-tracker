import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';

const EditExercise = (props) => {
	// const [myState, setState] = useState({
	// 	username: '',
	// 	description: '',
	// 	duration: 0,
	// 	date: new Date(),
	// 	users: []
	// });

	const [username, setUsername] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState(0);
	const [date, setDate] = useState(new Date());
	const [users, setUsers] = useState([]);

	const exerciseID = useParams().id;

	useEffect(() => {
		axios.get(process.env.REACT_APP_SERVER_URL + '/exercises/' + exerciseID) //.match.params.id originally, changed to functional component const
			.then(response => {
				setUsername(response.data.username);
				setDescription(response.data.description);
				setDuration(response.data.duration);
				setDate(new Date(response.data.date));
			})
			.catch(function (error) {
				console.log(error);
			})

		axios.get(process.env.REACT_APP_SERVER_URL + '/users/')
			.then(response => {
				if (response.data.length > 0) {
					setUsers(response.data.map(user => user.username))
				}
			})
			.catch((error) => {
				console.log(error);
			})

	}, []);

	const onChangeUsername = (e) => {
		setUsername(e.target.value)
	}

	const onChangeDescription = (e) => {
		setDescription(e.target.value)
	}

	const onChangeDuration = (e) => {
		setDuration(e.target.value)
	}

	const onChangeDate = (thisDate) => {
		setDate(thisDate)
	}

	const handleSubmit = (e) => {

		e.preventDefault();

		const exercise = {
			username: username,
			description: description,
			duration: duration,
			date: date
		}

		console.log(exerciseID);

		axios.post(process.env.REACT_APP_SERVER_URL + '/exercises/update/' + exerciseID, exercise)
			.then(res => console.log(res.data));

		window.location = '/';
	}

	return (
		<div>
			<h3>Edit Exercise Log</h3>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Username: </label>
					<select
						required
						className="form-control"
						value={username}
						onChange={(e) => onChangeUsername(e)}>
						{
							users.map(function (user) {
								return <option
									key={user}
									value={user}>{user}
								</option>;
							})
						}
					</select>
				</div>
				<div className="form-group">
					<label>Description: </label>
					<input type="text"
						required
						className="form-control"
						value={description}
						onChange={(e) => onChangeDescription(e)}
					/>
				</div>
				<div className="form-group">
					<label>Duration (in minutes): </label>
					<input
						type="text"
						className="form-control"
						value={duration}
						onChange={(e) => onChangeDuration(e)}
					/>
				</div>
				<div className="form-group">
					<label>Date: </label>
					<div>
						<DatePicker
							selected={date}
							onChange={(e) => onChangeDate(e)}
						/>
					</div>
				</div>

				<div className="form-group">
					<input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
				</div>
			</form>
		</div>
	)
}

export default EditExercise;